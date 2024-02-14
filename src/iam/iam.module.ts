import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { BcryptService } from './hashing/bcrypt.auth';

@Module({
  providers: [AuthenticationService, BcryptService],
  controllers: [AuthenticationController],
})
export class IamModule {}
