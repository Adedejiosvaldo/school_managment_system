import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeacherService } from '../teacher.service';
import { CreateTeacherDTO } from '../dto/CreateTeacher.dto';
import { LoginDTO } from 'src/iam/dto/login.dto';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enum/auth.type';
import { Role } from 'src/iam/authorization/enum/Role';
import { Roles } from 'src/iam/authorization/decorators/Role.decorators';

@Controller('auth/teacher')
export class TeacherAuthController {
  constructor(private readonly teacherService: TeacherService) {}

  @Auth(AuthType.None)
  @Post('login')
  login(@Body() dtoData: LoginDTO) {
    return this.teacherService.loginTeacher(dtoData);
    // return 'Hello';
  }

  @Auth(AuthType.Bearer)
  @Roles(Role.Admin)
  @Post('signup')
  createTeacher(@Body() dtoData: CreateTeacherDTO) {
    return this.teacherService.createATeacher(dtoData);
  }
}
