import { DeleteResult, Repository } from 'typeorm';
import { BaseInterfaceRepository } from './GenericRepo';

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  async findOneById(id: number): Promise<T> {
    return await this.entity.findOneBy({id:id});
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
