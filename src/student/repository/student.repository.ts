import { BaseAbstractRepository } from 'src/utils/asbtracts/base.abstract.repository';
import { Student } from '../entity/Student.entity';
import { StudentGenericInterface } from './student.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class StudentRepository
  extends BaseAbstractRepository<Student>
  implements StudentGenericInterface
{
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {
    super(studentRepo);
  }
}
