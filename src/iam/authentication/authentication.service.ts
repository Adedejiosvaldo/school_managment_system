// import {
//   BadRequestException,
//   ConflictException,
//   Inject,
//   Injectable,
//   NotFoundException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from 'src/user/entity/user.entity';
// import { DeepPartial, Repository } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';
// import { BcryptService } from '../hashing/bcrypt.auth';
// import { ConfigService, ConfigType } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';
// import jwtConfig from '../config/jwt.config';
// import { ActiveUserDTO } from './dto/ActiveUser.dto';
// import { SignInDTO } from './dto/auth/Signin.dto';
// import { CreateUser } from './dto/auth/createUser.dto';
// import { ForgotPasswordDTO } from './dto/auth/ForgotPassword.dto';
// import { MailerService } from '@nestjs-modules/mailer';
// import { Request } from 'express';
// import { ResetPasswordDTO } from './dto/auth/ResetPassword.dto';
// import { UpdatePasswordDTO } from './dto/auth/UpdatePassword.dto';
// import { LoginDTO } from '../dto/login.dto';
// import { createClassDTO } from 'src/class/dto/CreateClass.dto';
// @Injectable()
export class AuthenticationService {
  //   constructor(
  //     @InjectRepository(User)
  //     private readonly userRepository: Repository<User>,
  //     private readonly hashingService: BcryptService,
  //     private readonly jwtService: JwtService,
  //     // Mailing service
  //     private readonly mailingService: MailerService,
  //     //
  //     @Inject(jwtConfig.KEY)
  //     private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  //     // Request
  //     @Inject('REQUEST') private readonly request: Request,
  //   ) {}
  //   async signup(body: CreateUser) {
  //     try {
  //       const { email, password, name } = body;
  //       const hashedPassword: string = await this.hashingService.hash(password);
  //       const newUser = this.userRepository.create({
  //         email,
  //         name,
  //         password: hashedPassword,
  //       });
  //       const accessToken = await this.generateToken(newUser);
  //       await this.userRepository.save(newUser);
  //       return { accessToken, user: { newUser } };
  //     } catch (error) {
  //       const puUniqueViolationErrorCode = '23505';
  //       if (error.code === puUniqueViolationErrorCode) {
  //         throw new ConflictException('Email has been used already');
  //       }
  //     }
  //   }
  //   async Login(body: SignInDTO) {
  //     const { email, password } = body;
  //     const user = await this.userRepository.findOneBy({ email });
  //     if (!user) {
  //       throw new UnauthorizedException('User does not exist');
  //     }
  //     const isPasswordCorrect = await this.hashingService.compare(
  //       password,
  //       user.password,
  //     );
  //     if (!isPasswordCorrect) {
  //       throw new UnauthorizedException('Invalid Password');
  //     }
  //     const accessToken = await this.generateToken(user);
  //     return { accessToken, user };
  //   }
  //   async forgotPassword(body: ForgotPasswordDTO) {
  //     try {
  //       const { email } = body;
  //       const user = await this.userRepository.findOneBy({ email: email });
  //       if (!user) {
  //         throw new NotFoundException('User not Found');
  //       }
  //       const token = this.generateResetToken();
  //       // Calculate deadline
  //       const expiresIn = new Date();
  //       expiresIn.setMinutes(expiresIn.getMinutes() + 10);
  //       user.resetToken = token;
  //       //   Expires In
  //       user.resetTokenExpiresIn = expiresIn;
  //       await this.userRepository.save(user);
  //       await this.sendResetEmail(email, token);
  //       return {
  //         Message: 'Email Sent successfully and token will expire in 10 MINS',
  //       };
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   async resetPassword(token: string, body: ResetPasswordDTO) {
  //     console.log(token);
  //     const { confirmPassword, newPassword } = body;
  //     const user = await this.userRepository.findOneBy({ resetToken: token });
  //     console.log(user.email);
  //     if (!user) {
  //       throw new BadRequestException('User not found');
  //     }
  //     const resetTokenTTL = user.resetTokenExpiresIn;
  //     if (resetTokenTTL && new Date() > resetTokenTTL) {
  //       user.resetToken = null;
  //       console.log(user.resetToken);
  //       user.resetTokenExpiresIn = null;
  //       throw new UnauthorizedException(
  //         'Reset Token has expired, Resend another',
  //       );
  //     }
  //     if (newPassword !== confirmPassword) {
  //       throw new BadRequestException('Password dont match');
  //     }
  //     const hashedPassword = await this.hashingService.hash(newPassword);
  //     user.password = hashedPassword;
  //     user.resetToken = null;
  //     user.resetTokenExpiresIn = null;
  //     await this.userRepository.save(user);
  //     return {
  //       message: 'Password updated successfully',
  //       newUser: { name: user.name, email: user.email },
  //     };
  //   }
  //   //   Update Password
  //   async updatePassword(body: UpdatePasswordDTO, ActiveUser: ActiveUserDTO) {
  //     const { newPassword, oldPassword } = body;
  //     const user = await this.userRepository.findOneBy({ id: +ActiveUser.sub });
  //     const isPasswordCorrect = await this.hashingService.compare(
  //       oldPassword,
  //       user.password,
  //     );
  //     if (!isPasswordCorrect) {
  //       throw new UnauthorizedException('Incorrect Password');
  //     }
  //     const hashedNewPassword = await this.hashingService.hash(newPassword);
  //     user.password = hashedNewPassword;
  //     await this.userRepository.save(user);
  //     const token = this.generateToken(user);
  //     return { status: 'Successfully changedPassword', token };
  //   }
  //   // Auth Private Methods
  //   private async signInToStudent<T>(data: LoginDTO, repo: Repository<T>) {}
  //   //   Private Methods
  //   private async generateToken(user: User) {
  //     const accessToken = await this.signToken<Partial<ActiveUserDTO>>(
  //       user.id,
  //       this.jwtConfiguration.accessTokenTTL,
  //       { email: user.email },
  //     );
  //     // user.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000;
  //     return accessToken;
  //   }
  //   private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
  //     return await this.jwtService.sign(
  //       { sub: userId, ...payload },
  //       {
  //         issuer: this.jwtConfiguration.issuer,
  //         audience: this.jwtConfiguration.audience,
  //         secret: this.jwtConfiguration.secret,
  //         expiresIn,
  //       },
  //     );
  //   }
  //   private generateResetToken(): string {
  //     const token: string = uuidv4();
  //     return token;
  //   }
  //   private async sendResetEmail(
  //     email: string,
  //     resetToken: string,
  //   ): Promise<void> {
  //     const resetURL = `${this.request.protocol}://${this.request.get(
  //       'host',
  //     )}/auth/reset-password/${resetToken}`;
  //     const message = `Forgot your password? Submit a request with your new password and confirm it to : ${resetURL}. \n If you didn't forget your password. Ignore this email`;
  //     try {
  //       await this.mailingService.sendMail({
  //         to: email,
  //         subject: 'Reset Your password',
  //         html: `<p>Please click the link below to reset your password:<a href=${resetURL}">Reset Password</a></p><br><p>If you didn't request this, you can safely ignore this email.</p>`,
  //         text: message,
  //         context: { resetURL },
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}

// // Generic Auth Service
