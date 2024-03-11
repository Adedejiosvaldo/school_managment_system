import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entity/Teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDTO } from './dto/CreateTeacher.dto';
import { BcryptService } from 'src/iam/hashing/bcrypt.auth';
import { TeacherInterface } from './repository/teacher.interface';

@Injectable()
export class TeacherService {
  constructor(
    @Inject('TeacherRepo') private readonly teacherRepo: TeacherInterface,
    private readonly hashingService: BcryptService,
  ) {}

  async createATeacher(dtoData: CreateTeacherDTO) {
    const { email, password, name, classID } = dtoData;
    const hashedPassword = this.hashingService.hash(password);

    const newTeacher = await this.teacherRepo.create;
  }
}
