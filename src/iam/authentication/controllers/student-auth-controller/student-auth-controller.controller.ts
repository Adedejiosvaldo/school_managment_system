import { Body, Controller, Post } from '@nestjs/common';
import { StudentAuthServicesService } from '../../services/student-auth-services/student-auth-services.service';
import { CreateUser } from '../../dto/auth/createUser.dto';
import { Auth } from '../../decorators/auth.decorator';
import { AuthType } from '../../enum/auth.type';
import { LoginDTO } from 'src/iam/dto/login.dto';

@Controller('auth/student')
export class StudentAuthControllerController {
  constructor(
    private readonly studentAuthService: StudentAuthServicesService,
  ) {}

  @Auth(AuthType.None)
  @Post('signup')
  async createNeWStudent(@Body() body: CreateUser) {
    return this.studentAuthService.signup(body);
  }

  @Auth(AuthType.None)
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.studentAuthService.Login(body);
  }
}
