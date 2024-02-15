import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../dto/login.dto';
import { AuthenticationService } from './authentication.service';
import { createUserDTO } from './dto/createUser.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('signup')
  Signup(@Body() body: createUserDTO) {
    return this.authService.signup(body);
  }

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
