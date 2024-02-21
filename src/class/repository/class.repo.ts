import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/utils/asbtracts/base.abstract.repository';
import { Class } from '../entity/Class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassRepository
  extends BaseAbstractRepository<Class>
  implements ClassRepository
{
  constructor(
    @InjectRepository(Class) private readonly classRepo: Repository<Class>,
  ) {
    super(classRepo);
  }
}
