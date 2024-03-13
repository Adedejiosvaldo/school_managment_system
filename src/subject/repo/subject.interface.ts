import { BaseAbstractRepository } from 'src/utils/asbtracts/base.abstract.repository';
import { Subject } from '../entity/Subject.entity';

export interface SubjectGenericInterface
  extends BaseAbstractRepository<Subject> {}
