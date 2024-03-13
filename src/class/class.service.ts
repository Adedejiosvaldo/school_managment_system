import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClassRepositoryInterface } from './repository/class.interface.repo';
import { createClassDTO } from './dto/CreateClass.dto';
import { AuthenticationService } from 'src/iam/authentication/authentication.service';
import { Teacher } from 'src/teacher/entity/Teacher.entity';
// import { BaseAuthServiceALL } from 'src/iam/authentication/authentication.service.generic.';
import { BcryptService } from 'src/iam/hashing/bcrypt.auth';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUser } from 'src/iam/authentication/dto/auth/createUser.dto';
import { School } from 'src/school/entity/School.entity';
import { ActiveUserDTO } from 'src/iam/authentication/dto/ActiveUser.dto';
import { Class } from './entity/Class.entity';

interface IfindOneById<T> extends FindOneOptions<T> {
  id: number;
}

@Injectable()
// Create Interface  that extends the BaseRepo with the entity
// Create a repo using @InjectRepo and make it the super
// Using {provide,useClass}, we create a value that when used, calls the repo
// In the user class ,we inject it
export class ClassService {
  constructor(
    @Inject('ClassRepositoryInterface')
    private readonly classRepo: ClassRepositoryInterface,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(School) private readonly schoolRepo: Repository<School>,
  ) {}

  async getAllClasses() {
    const classes = await this.classRepo.findAllWithRelations(['subject']);
    // const classes = await this.classRepository.find({
    //   relations: { subject: true },
    // });

    return classes;
  }

  async createClass(data: createClassDTO, schoolID: ActiveUserDTO) {
    const school = await this.schoolRepo.findOneBy({ id: schoolID.schoolID });

    if (!school) {
      throw new BadRequestException('A School has to exist before classes');
    }
    const newClass = await this.classRepo.create({
      numberOfStudentPermitted: data.numberOfStudentPermitted,
      name: data.name,
      description: data.description,
      school: school,
    });

    return newClass;
  }

  async getAClass(id: number): Promise<Class | undefined> {
    const options: FindOneOptions<Class> = { where: { id } };
    const validClass = await this.classRepo.findOneWithRelations(options, [
      'subject',
    ]);
    // const validClass = await this.classRepository.findOne({
    //   where: { id: id },
    //   relations: ['subject'],
    // });

    return validClass;
  }
}
