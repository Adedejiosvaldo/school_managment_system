// import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
// import { LoginDTO } from '../dto/login.dto';
// import { AuthenticationService } from './authentication.service';
// import { CreateUser } from './dto/auth/createUser.dto';
// import { Auth } from './decorators/auth.decorator';
// import { AuthType } from './enum/auth.type';
// import { ForgotPasswordDTO } from './dto/auth/ForgotPassword.dto';
// import { ResetPasswordDTO } from './dto/auth/ResetPassword.dto';
// import { UpdatePasswordDTO } from './dto/auth/UpdatePassword.dto';
// import { ActiveUser } from './decorators/ActiveUser.decorator';
// import { ActiveUserDTO } from './dto/ActiveUser.dto';
// import { User } from 'src/user/entity/user.entity';

// @Controller('auth')
// export class AuthenticationController {
//   constructor(private readonly authService: AuthenticationService) {}
//   @Auth(AuthType.None)
//   @Post('signup')
//   Signup(@Body() body: CreateUser) {
//     return this.authService.signup(body);
//   }

//   @Auth(AuthType.None)
//   @Post('login')
//   Login(@Body() bodyDTO: LoginDTO) {
//     return this.authService.Login(bodyDTO);
//   }

//   @Auth(AuthType.None)
//   @Post()
//   Logout(@Body() bodyDTO: LoginDTO) {}

//   //   Password Actions
//   //   User is not logged in
//   @Auth(AuthType.None)
//   @Post('forgot-password')
//   ForgotPassword(@Body() body: ForgotPasswordDTO) {
//     return this.authService.forgotPassword(body);
//   }

//   @Auth(AuthType.None)
//   @Patch('reset-password/:token')
//   ResetPassword(@Body() body: ResetPasswordDTO, @Param('token') token: string) {
//     return this.authService.resetPassword(token, body);
//   }

//   @Auth(AuthType.Bearer)
//   //   User is login in
//   @Post('update-password')
//   async UpdatePassword(
//     @Body() bodyDTO: UpdatePasswordDTO,
//     @ActiveUser() currentUser: ActiveUserDTO,
//   ) {
//     return this.authService.updatePassword(bodyDTO, currentUser);
//   }
// }
