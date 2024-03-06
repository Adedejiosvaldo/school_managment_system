import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entity/Admin.entity';
import { BcryptService } from 'src/iam/hashing/bcrypt.auth';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/iam/config/jwt.config';
import { School } from '../school/entity/School.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, School]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [AdminService, BcryptService],
  controllers: [AdminController],
})
export class AdminModule {}
