import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entity/Teacher.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTeacherDTO } from './dto/CreateTeacher.dto';
import { BcryptService } from 'src/iam/hashing/bcrypt.auth';
import { TeacherInterface } from './repository/teacher.interface';
import { Class } from 'src/class/entity/Class.entity';
import { ActiveUserDTO } from 'src/iam/authentication/dto/ActiveUser.dto';
import jwtConfig from 'src/iam/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/iam/dto/login.dto';
import { access } from 'fs';

@Injectable()
export class TeacherService {
  constructor(
    @Inject('TeacherRepo') private readonly teacherRepo: TeacherInterface,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Class) private readonly classRepo: Repository<Class>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly hashingService: BcryptService,
  ) {}

  async createATeacher(
    dtoData: CreateTeacherDTO,
  ): Promise<{ accessToken: string; newTeacher: Teacher }> {
    const { email, password, name, classID } = dtoData;
    const hashedPassword = await this.hashingService.hash(password);
    const schoolClass = await this.classRepo.findOneBy({ id: classID });
    if (!schoolClass) {
      throw new BadRequestException('Class does not exist');
    }
    const newTeacher = await this.teacherRepo.create({
      name: name,
      password: hashedPassword,
      email,
      class: schoolClass,
    });
    const accessToken = await this.generateToken(newTeacher);
    return { accessToken, newTeacher };
  }

  async loginTeacher(data: LoginDTO): Promise<{ accessToken: string }> {
    const { email, password } = data;
    const options: FindOneOptions<Teacher> = { where: { email } };
    const teacherExist = await this.teacherRepo.findOne(options);

    if (!teacherExist) {
      throw new UnauthorizedException('Email does not exist');
    }
    const isPasswordCorrect = await this.hashingService.compare(
      password,
      teacherExist.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect password');
    }

    const accessToken = await this.generateToken(teacherExist);

    return { accessToken };
  }

  //   Private Methods
  private async generateToken(user: Teacher) {
    const accessToken = await this.signToken<Partial<ActiveUserDTO>>(
      user.id,
      this.jwtConfiguration.accessTokenTTL,
      { email: user.email, role: user.role },
    );
    // user.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000;
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
