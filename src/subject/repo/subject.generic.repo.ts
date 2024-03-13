import { BaseAbstractRepository } from 'src/utils/asbtracts/base.abstract.repository';
import { Subject } from '../entity/Subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectGenericInterface } from './subject.interface';

export class SubjectRepository
  extends BaseAbstractRepository<Subject>
  implements SubjectGenericInterface
{
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {
    super(subjectRepo);
  }
}
