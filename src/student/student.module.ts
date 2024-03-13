import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentAuthController } from './auth/controller.ts/student.auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/Student.entity';
import { StudentRepository } from './repository/student.repository';
import { Class } from 'src/class/entity/Class.entity';
import jwtConfig from 'src/iam/config/jwt.config';
import { BcryptService } from 'src/iam/hashing/bcrypt.auth';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Class]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [StudentController, StudentAuthController],
  providers: [
    StudentService,
    { provide: 'StudentRepo', useClass: StudentRepository },
    BcryptService,
  ],
})
export class StudentModule {}
