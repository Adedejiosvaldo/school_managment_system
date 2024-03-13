import { DeepPartial, DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { BaseInterfaceRepository } from './GenericRepo';
import { ConflictException, NotFoundException } from '@nestjs/common';

interface IfindOneById<T> extends FindOneOptions<T> {
  id: number;
}

interface FindOptions {
  id: number;
}

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  protected constructor(private readonly entity: Repository<T>) {}

  async create(data: Partial<T> | Partial<T>[]): Promise<T> {
    try {
      const entity = this.entity.create(data as DeepPartial<T>);
      const savedData = await this.entity.save(entity);
      console.log(savedData);
      return savedData;
    } catch (error) {
      const puUniqueViolationErrorCode = '23505';

      if (error.code === puUniqueViolationErrorCode) {
        throw new ConflictException(`${error.message}`);
      }
    }
  }

  async findOneWithRelations(
    options: FindOneOptions<T>,
    relations?: string[],
  ): Promise<T | undefined> {
    if (relations && relations.length > 0) {
      options.relations = [...relations];
    }

    const entity = await this.entity.findOne(options);

    if (!entity) {
      throw new NotFoundException(`${this.entity.metadata.name} not found`);
    }

    return entity;
  }

  async findOne(options: FindOneOptions<T>): Promise<T | undefined> {
    const doc = await this.entity.findOne(options);
    // if (!doc) {
    //   throw new NotFoundException('No doc was found');
    // }
    return doc;
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
