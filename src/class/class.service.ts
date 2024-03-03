import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClassRepositoryInterface } from './repository/class.interface.repo';
import { createClassDTO } from './dto/CreateClass.dto';
import { AuthenticationService } from 'src/iam/authentication/authentication.service';
import { Teacher } from 'src/teacher/entity/Teacher.entity';
import { BaseAuthServiceALL } from 'src/iam/authentication/authentication.service.generic.';
import { BcryptService } from 'src/iam/hashing/bcrypt.auth';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
// Create Interface  that extends the BaseRepo with the entity
// Create a repo using @InjectRepo and make it the super
// Using {provide,useClass}, we create a value that when used, calls the repo
// In the user class ,we inject it
export class ClassService {
  constructor(
    @Inject('ClassRepositoryInterface')
    private readonly classRepo: ClassRepositoryInterface,

    private authService: BaseAuthServiceALL<Teacher>,

    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
    private readonly hashingService: BcryptService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    this.authService = new BaseAuthServiceALL<Teacher>(
      this.teacherRepo,
      this.hashingService,
      this.jwtService,
      this.jwtConfiguration,
    );
  }

  async getAllClasses() {
    await this.authService.createAccount(dto);
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
