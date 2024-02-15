import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../dto/login.dto';

@Controller('auth')
export class AuthenticationController {
  @Post('signup')
  Signup() {}

  @Post('/login')
  Login(@Body() bodyDTO: LoginDTO) {}

  @Post()
  Logout(@Body() bodyDTO: LoginDTO) {}

  //   Password Actions
  //   User is not logged in
  @Post('forgot-password')
  ForgotPassword(@Body() bodyDTO: LoginDTO) {}

  @Post('reset-password')
  ResetPassword(@Body() bodyDTO: LoginDTO) {}

  //   User is login in
  @Post('update-password')
  UpdatePassword(@Body() bodyDTO: LoginDTO) {}
}
