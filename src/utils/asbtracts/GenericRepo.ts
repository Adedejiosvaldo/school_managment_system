// export abstract class GenericRepository<T> {
//   abstract getAll(): Promise<T[]>;
//   abstract getOne(id: number): Promise<T>;
//   abstract create(data: T): Promise<T[]>;
//   abstract update(id: number, updateDate: T): Promise<T[]>;
//   abstract delete(): Promise<T[]>;
// }

import { DeleteResult } from 'typeorm';
interface BaseEntity {
  id: number;
}
export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;

  findOneById(id: number): Promise<T>;

  findByCondition(filterCondition: any): Promise<T>;

  findAll(): Promise<T[]>;

  remove(id: string): Promise<DeleteResult>;

  findWithRelations(relations: any): Promise<T[]>;
}

interface anythingGies {
  id: number;
}
