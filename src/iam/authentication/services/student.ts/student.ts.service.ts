import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import jwtConfig from 'src/iam/config/jwt.config';
import { BcryptService } from 'src/iam/hashing/bcrypt.auth';
import { Student } from 'src/student/entity/Student.entity';
import { Repository } from 'typeorm';
import { BaseAuthServiceALL } from '../../authentication.service.generic.';
import { studentSignUpDTO } from '../../dto/auth/studentDTO/studentSignUp.dto';
import { LoginDTO } from 'src/iam/dto/login.dto';

interface UserWithPassword {
  password: string;
  // Other properties common to users...
}

@Injectable()
export class StudentAuthService {
  constructor(
    @InjectRepository(Student)
    private readonly authService: BaseAuthServiceALL<Student>,
    // private readonly studentRepo: Repository<Student>,
    private readonly hashingService: BcryptService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async loginUser(loginDto: LoginDTO): Promise<string> {
    return await this.authService.login(loginDto);
  }

  async createUser(userDto: studentSignUpDTO): Promise<string> {
    const authResponse = await this.authService.createAccount(userDto);
    return authResponse.accessToken;
  }
}
