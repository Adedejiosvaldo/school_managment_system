import { Inject, Injectable } from '@nestjs/common';
import { ClassRepositoryInterface } from './repository/class.interface.repo';

@Injectable()
// Create Interface  that extends the BaseRepo with the entity
// Create a repo using @InjectRepo and make it the super
// Using {provide,useClass}, we create a value that when used, calls the repo
// In the user class ,we inject it
export class ClassService {
  constructor(
    @Inject('ClassRepositoryInterface')
    private readonly classRepo: ClassRepositoryInterface,
  ) {}
  async hello() {
    this.classRepo.create;
  }
}
