import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enum/auth.type';
import { createClassDTO } from './dto/CreateClass.dto';
import { CreateUser } from 'src/iam/authentication/dto/auth/createUser.dto';
import { Role } from 'src/iam/authorization/enum/Role';
import { Roles } from 'src/iam/authorization/decorators/Role.decorators';
import { ActiveUser } from 'src/iam/authentication/decorators/ActiveUser.decorator';
import { ActiveUserDTO } from 'src/iam/authentication/dto/ActiveUser.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Auth(AuthType.None)
  @Get()
  getAll() {
    return 'Hello';
  }

  @Auth(AuthType.Bearer)
  @Roles(Role.Admin)
  @Post()
  createClass(@Body() body: createClassDTO, @ActiveUser() user: ActiveUserDTO) {
    console.log(user);
    return this.classService.createClass(body, user);
  }
}
