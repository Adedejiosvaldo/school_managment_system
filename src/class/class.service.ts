import { Inject, Injectable } from '@nestjs/common';
import { ClassRepositoryInterface } from './repository/class.interface.repo';

@Injectable()
export class ClassService {
  constructor(
    @Inject('ClassRepositoryInterface')
    private readonly classRepo: ClassRepositoryInterface,
  ) {}
  async hello() {
    this.classRepo.create
  }
}
