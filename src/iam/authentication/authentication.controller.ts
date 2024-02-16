import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../dto/login.dto';
import { AuthenticationService } from './authentication.service';
import { CreateUser } from './dto/auth/createUser.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enum/auth.type';
import { ForgotPasswordDTO } from './dto/auth/ForgotPassword.dto';

@Auth(AuthType.None)
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('signup')
  Signup(@Body() body: CreateUser) {
    return this.authService.signup(body);
  }

  @Post('login')
  Login(@Body() bodyDTO: LoginDTO) {
    return this.authService.Login(bodyDTO);
  }

  @Post()
  Logout(@Body() bodyDTO: LoginDTO) {}

  //   Password Actions
  //   User is not logged in
  @Post('forgot-password')
  ForgotPassword(@Body() body: ForgotPasswordDTO) {
    return this.authService.forgotPassword(body);
  }

  @Post('reset-password')
  ResetPassword(@Body() bodyDTO: LoginDTO) {}

  //   User is login in
  @Post('update-password')
  UpdatePassword(@Body() bodyDTO: LoginDTO) {}
}
