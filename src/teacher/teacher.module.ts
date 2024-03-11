import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entity/Teacher.entity';
import { BcryptService } from 'src/iam/hashing/bcrypt.auth';
import { TeacherRepo } from './repository/teacher.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [
    TeacherService,
    { provide: 'TeacherRepo', useClass: TeacherRepo },
    BcryptService,
  ],
})
export class TeacherModule {}
