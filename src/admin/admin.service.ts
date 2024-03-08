import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entity/Admin.entity';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/iam/hashing/bcrypt.auth';
import { createAdminDTO } from './dto/CreateAdmin.dto';
import { JwtService } from '@nestjs/jwt';
import { ActiveUser } from 'src/iam/authentication/decorators/ActiveUser.decorator';
import { userInfo } from 'os';
import jwtConfig from 'src/iam/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { LoginDTO } from 'src/iam/dto/login.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private hashingService: BcryptService,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async createAdmin(body: createAdminDTO) {
    try {
      const { password } = body;
      const hashedPassword = await this.hashingService.hash(password);
      const newAdmin = this.adminRepo.create({
        ...body,
        password: hashedPassword,
      });
      const accessToken = this.jwtService.sign(
        {
          sub: newAdmin.id,
          role: newAdmin.role,
          email: newAdmin.email,
          schoolID: newAdmin.schools,
        },
        {
          issuer: this.jwtConfiguration.issuer,
          audience: this.jwtConfiguration.audience,
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.accessTokenTTL,
        },
      );
      await this.adminRepo.save(newAdmin);
      return { accessToken, user: { newAdmin } };
    } catch (error) {
      const puUniqueViolationErrorCode = '23505';

      if (error.code === puUniqueViolationErrorCode) {
        throw new ConflictException('Email has been used already');
      }
      throw new BadRequestException('Bad request');
    }
  }

  async loginAdmin(body: LoginDTO) {
    try {
      const { email, password } = body;
      const user = await this.adminRepo.findOneBy({ email });

      if (!user) {
        throw new UnauthorizedException('User does not exist');
      }

      const isPasswordCorrect = await this.hashingService.compare(
        password,
        user.password,
      );
      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Invalid Password');
      }
      const accessToken = this.jwtService.sign(
        { sub: user.id, role: user.role, email: user.email },
        {
          issuer: this.jwtConfiguration.issuer,
          audience: this.jwtConfiguration.audience,
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.accessTokenTTL,
        },
      );
      return { accessToken, user };
    } catch (error) {
      throw new BadRequestException('Bad request -', error.message);
    }
  }

  async getAllAdmins(): Promise<Admin[]> {
    return this.adminRepo.find({
      select: ['email', 'id', 'name', 'role'],
      relations: { schools: true },
    });
  }

  async getOneAdmin(id: number): Promise<Admin> {
    return this.adminRepo.findOneBy({ id });
  }
}
