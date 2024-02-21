import { DeleteResult } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  create(data: Partial<T> | Partial<T>[]): Promise<T | T[]>;
  update(id: number, data: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<DeleteResult>;
}
