import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entity/Teacher.entity';
import { BcryptService } from 'src/iam/hashing/bcrypt.auth';
import { TeacherRepo } from './repository/teacher.repo';
import { TeacherAuthController } from './authcontroller.auth.ts/authcontroller.auth.ts.controller';
import { Class } from 'src/class/entity/Class.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, Class]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [TeacherController, TeacherAuthController],
  providers: [
    TeacherService,
    { provide: 'TeacherRepo', useClass: TeacherRepo },
    BcryptService,
  ],
})
export class TeacherModule {}
