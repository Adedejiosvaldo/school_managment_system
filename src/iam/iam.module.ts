import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';

@Module({
  providers: [AuthenticationService],
  controllers: [AuthenticationController]
})
export class IamModule {}
