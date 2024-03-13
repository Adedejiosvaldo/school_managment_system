import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentAuthController } from './auth/controller.ts/student.auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/Student.entity';
import { StudentRepository } from './repository/student.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController, StudentAuthController],
  providers: [
    StudentService,
    { provide: 'StudentRepo', useClass: StudentRepository },
  ],
})
export class StudentModule {}
