import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    AuthenticationService,
    BcryptService,
    { provide: APP_GUARD, useClass: AuthenticationGuardGuard },
    AccessTokenGuard,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
