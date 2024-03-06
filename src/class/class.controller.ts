import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enum/auth.type';
import { createClassDTO } from './dto/CreateClass.dto';
import { CreateUser } from 'src/iam/authentication/dto/auth/createUser.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Auth(AuthType.None)
  @Post()
  getAll(@Body() body: CreateUser) {
    return this.classService.getAllClasses(body);
  }

  @Post()
  @Auth(AuthType.None)
  createClass(@Body() body: createClassDTO) {
    return this.classService.createClass({ ...body });
  }
}
