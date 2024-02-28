import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enum/auth.type';
import { createClassDTO } from './dto/CreateClass.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Auth(AuthType.None)
  @Get()
  getAll() {
    return this.classService.getAllClasses();
  }

  @Post()
  @Auth(AuthType.None)
  createClass(@Body() body: createClassDTO) {
    return this.classService.createClass({ ...body });
  }
}
