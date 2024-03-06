import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { BcryptService } from './hashing/bcrypt.auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
// import { AuthGuardGuard } from './authentication/guards/auth_guard/access_token_guard.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuardGuard } from './authentication/guards/authentication_guard/authentication_guard.guard';
import { AccessTokenGuard } from './authentication/guards/auth_guard/access_token_guard.guard';
import { Student } from '../student/entity/Student.entity';
import { Teacher } from '../teacher/entity/Teacher.entity';
import { Parent } from './authentication/entities/Parent.entity';
import { BaseAuthServiceALL } from './authentication/authentication.service.generic.';
import { StudentAuthServicesService } from './authentication/services/student-auth-services/student-auth-services.service';
import { TeacherAuthService } from './authentication/services/teacher-auth-services/teacher-auth-services.service';
// import { ParentAuthServicesService } from './authentication/services/parent-auth-services/parent-auth-services.service';

import { StudentAuthControllerController } from './authentication/controllers/student-auth-controller/student-auth-controller.controller';
import { TeacherAuthControllerController } from './authentication/controllers/teacher-auth-controller/teacher-auth-controller.controller';
import { ParentAuthControllerController } from './authentication/controllers/parent-auth-controller/parent-auth-controller.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Teacher, Parent]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    AuthenticationService,
    BcryptService,
    BaseAuthServiceALL,
    { provide: APP_GUARD, useClass: AuthenticationGuardGuard },
    AccessTokenGuard,
    StudentAuthServicesService,
    TeacherAuthService,
    // ParentAuthServicesService,
  ],
  controllers: [
    StudentAuthControllerController,
    TeacherAuthControllerController,
    ParentAuthControllerController,
  ],
  exports: [IamModule],
})
export class IamModule {}
