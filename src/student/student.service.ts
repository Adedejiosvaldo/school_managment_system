import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { StudentGenericInterface } from './repository/student.interface';
import { BcryptService } from 'src/iam/hashing/bcrypt.auth';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { Student } from './entity/Student.entity';
import { createSubjectDTO } from 'src/subject/dto/createSubject.dto';
import { CreateStudentDTO } from './dto/createStudent.dto';
import { Class } from 'src/class/entity/Class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { LoginDTO } from 'src/iam/dto/login.dto';
import { ActiveUserDTO } from 'src/iam/authentication/dto/ActiveUser.dto';

@Injectable()
export class StudentService {
  constructor(
    @Inject('StudentRepo')
    private readonly studentRepo: StudentGenericInterface,
    @InjectRepository(Class) private readonly classRepo: Repository<Class>,
    //
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly hashingService: BcryptService,
  ) {}

  async createATeacher(
    dtoData: CreateStudentDTO,
  ): Promise<{ accessToken: string; student: Student }> {
    const { email, password, name, classID } = dtoData;
    const hashedPassword = await this.hashingService.hash(password);
    const schoolClass = await this.classRepo.findOneBy({ id: classID });
    if (!schoolClass) {
      throw new BadRequestException('Class does not exist');
    }
    const student = await this.studentRepo.create({
      name: name,
      password: hashedPassword,
      email,
      class: schoolClass,
    });
    const accessToken = await this.generateToken(student);
    return { accessToken, student };
  }

  async loginTeacher(data: LoginDTO): Promise<{ accessToken: string }> {
    const { email, password } = data;
    const options: FindOneOptions<Student> = { where: { email } };
    const teacherExist = await this.studentRepo.findOne(options);

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
  private async generateToken(user: Student) {
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
