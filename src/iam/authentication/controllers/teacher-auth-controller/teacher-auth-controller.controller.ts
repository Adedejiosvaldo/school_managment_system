import { Body, Controller, Post } from '@nestjs/common';
import { BaseAuthServiceALL } from '../../authentication.service.generic.';
import { CreateUser } from '../../dto/auth/createUser.dto';
import { LoginDTO } from 'src/iam/dto/login.dto';
import { Auth } from '../../decorators/auth.decorator';
import { AuthType } from '../../enum/auth.type';
@Auth(AuthType.None)
@Controller('teacher/auth')
export class TeacherAuthControllerController {
  constructor(private readonly teacherAuthService: BaseAuthServiceALL) {}

  @Post('signup')
  async createTeacher(@Body() body: CreateUser) {
    return this.teacherAuthService.createAccount(body);
  }
  @Post('login')
  async loginTeacher(@Body() body: LoginDTO) {
    return this.teacherAuthService.login(body);
  }
}
