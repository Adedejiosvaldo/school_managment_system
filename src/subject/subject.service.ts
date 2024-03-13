import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SubjectGenericInterface } from './repo/subject.interface';
import { Class } from 'src/class/entity/Class.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createSubjectDTO } from './dto/createSubject.dto';
import { ClassRepositoryInterface } from 'src/class/repository/class.interface.repo';

@Injectable()
export class SubjectService {
  constructor(
    @Inject('SubjectRepo')
    private readonly subjectRepo: SubjectGenericInterface,
    @Inject('ClassRepositoryInterface')
    private readonly classRepo: ClassRepositoryInterface,
    // @InjectRepository(Class) private readonly classRepo: Repository<Class>,
  ) {}

  async createSubject(data: createSubjectDTO) {
    const { classID, name } = data;
    const classOptions: FindOneOptions<Class> = { where: { id: classID } };
    const classExist = await this.classRepo.findOne(classOptions);

    if (!classExist) {
      throw new BadRequestException('Class doesnt exist');
    }
    const subject = await this.subjectRepo.create({
      name: name,
      class: classExist,
    });
    return subject;
  }
}
