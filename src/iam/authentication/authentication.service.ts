import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { createUserDTO } from './dto/createUser.dto';
import { BcryptService } from '../hashing/bcrypt.auth';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ActiveUserDTO } from './dto/ActiveUser.dto';
@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: BcryptService,

    private readonly jwtService: JwtService,

    //
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signup(body: createUserDTO) {
    try {
      const { email, password, name } = body;
      const hashedPassword: string = await this.hashingService.hash(password);

      const newUser = await this.userRepository.create({
        email,
        name,
        password: hashedPassword,
      });
      const accessToken = await this.generateToken(newUser);
      await this.userRepository.save(newUser);
      return { accessToken, user: { newUser } };
    } catch (error) {
      const puUniqueViolationErrorCode = '23505';

      if (error.code === puUniqueViolationErrorCode) {
        throw new ConflictException('Email has been used already');
      }
    }
  }

  private async generateToken(user: User) {
    const accessToken = await this.signToken<Partial<ActiveUserDTO>>(
      user.id,
      this.jwtConfiguration.accessTokenTTL,
      { email: user.password },
    );
    return accessToken;
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.sign(
      { sub: userId, ...payload },
      {
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
