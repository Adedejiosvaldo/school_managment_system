import { DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { BaseInterfaceRepository } from './GenericRepo';

interface BaseEntity {
  id: number;
}

interface IfindOneById<T> extends FindOneOptions<T> {
  id: number;
}

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  protected constructor(private readonly entity: Repository<T>) {}

  async findOneById(id: number): Promise<T | null> {
    const options: IfindOneById<T> = { id };

    return await this.entity.findOne(options);
  }

  create(data: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  findByCondition(filterCondition: any): Promise<T> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }
  findWithRelations(relations: any): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
}
