import { BaseAbstractRepository } from 'src/utils/asbtracts/base.abstract.repository';
import { Student } from '../entity/Student.entity';

export interface StudentGenericInterface
  extends BaseAbstractRepository<Student> {}
