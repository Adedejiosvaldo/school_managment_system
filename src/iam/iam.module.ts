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
// import { BaseAuthServiceALL } from './authentication/authentication.service.generic.';
// import { ParentAuthServicesService } from './authentication/services/parent-auth-services/parent-auth-services.service';

import { RolesGuard } from './authorization/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Teacher, Parent]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    AuthenticationService,
    BcryptService,

    { provide: APP_GUARD, useClass: AuthenticationGuardGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    AccessTokenGuard,
    // ParentAuthServicesService,
  ],
  controllers: [],
  exports: [IamModule],
})
export class IamModule {}
