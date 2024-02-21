import { DeepPartial, DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { BaseInterfaceRepository } from './GenericRepo';
import { ConflictException } from '@nestjs/common';

interface IfindOneById<T> extends FindOneOptions<T> {
  id: number;
}

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  protected constructor(private readonly entity: Repository<T>) {}

  async create(data: Partial<T> | Partial<T>[]): Promise<T | T[]> {
    const entity = this.entity.create(data as DeepPartial<T>);
    return await this.entity.save(entity);
  }

  async findOne(id: number): Promise<T> {
    const options: IfindOneById<T> = { id };
    return await this.entity.findOne(options);
  }

  async findAll(): Promise<T[]> {
    return await this.entity.find();
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const options: IfindOneById<T> = { id };
    const entity = await this.entity.findOne(options);
    if (!entity) {
      return null;
    }
    Object.assign(entity, data);
    return await this.entity.save(entity);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }
}
