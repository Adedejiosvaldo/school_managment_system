import { BaseAbstractRepository } from 'src/utils/asbtracts/base.abstract.repository';
import { Teacher } from '../entity/Teacher.entity';
import { TeacherInterface } from './teacher.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TeacherRepo
  extends BaseAbstractRepository<Teacher>
  implements TeacherInterface
{
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {
    super(teacherRepo);
  }
}
