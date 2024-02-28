import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClassRepositoryInterface } from './repository/class.interface.repo';
import { createClassDTO } from './dto/CreateClass.dto';

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

  async getAllClasses() {
    const classes = await this.classRepo.findAll();
    if (classes.length === 0) {
      return 'No class at the moment';
    }
    return classes;
  }

  async createClass(data: createClassDTO) {
    const newClass = await this.classRepo.create({ ...data });
    return newClass;
  }
}
