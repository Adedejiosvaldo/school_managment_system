import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../dto/login.dto';

@Controller('authentication')
export class AuthenticationController {
  @Post()
  Signup() {}

  @Post()
  Login(@Body() bodyDTO: LoginDTO) {}
}
