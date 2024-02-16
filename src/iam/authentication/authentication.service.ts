import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BcryptService } from '../hashing/bcrypt.auth';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ActiveUserDTO } from './dto/ActiveUser.dto';
import { SignInDTO } from './dto/auth/Signin.dto';
import { CreateUser } from './dto/auth/createUser.dto';
import { ForgotPasswordDTO } from './dto/auth/ForgotPassword.dto';

import { MailerService } from '@nestjs-modules/mailer';
import { Request } from 'express';
@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: BcryptService,

    private readonly jwtService: JwtService,
    // Mailing service
    private readonly mailingService: MailerService,
    //
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    // Request
    @Inject('REQUEST') private readonly request: Request,
  ) {}

  async signup(body: CreateUser) {
    try {
      const { email, password, name } = body;
      const hashedPassword: string = await this.hashingService.hash(password);

      const newUser = await this.userRepository.create({
        email,
        name,
        password: hashedPassword,
      });
      const accessToken = await this.generateToken(newUser);
      await this.userRepository.save(newUser);
      return { accessToken, user: { newUser } };
    } catch (error) {
      const puUniqueViolationErrorCode = '23505';

      if (error.code === puUniqueViolationErrorCode) {
        throw new ConflictException('Email has been used already');
      }
    }
  }

  async Login(body: SignInDTO) {
    const { email, password } = body;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const isPasswordCorrect = this.hashingService.compare(
      password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid Password');
    }
    const accessToken = await this.generateToken(user);
    return { accessToken, user };
  }

  async forgotPassword(body: ForgotPasswordDTO) {
    try {
      const { email } = body;
      const user = await this.userRepository.findOneBy({ email: email });

      if (!user) {
        throw new NotFoundException('User not Found');
      }

      const token = this.generateResetToken();
      user.resetToken = token;
      await this.userRepository.save(user);

      await this.sendResetEmail(email, token);

      return { Message: '' };
    } catch (error) {
      console.log(error);
    }
  }

  //   Private Methods

  private async generateToken(user: User) {
    const accessToken = await this.signToken<Partial<ActiveUserDTO>>(
      user.id,
      this.jwtConfiguration.accessTokenTTL,
      { email: user.email },
    );
    return accessToken;
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.sign(
      { sub: userId, ...payload },
      {
        issuer: this.jwtConfiguration.issuer,
        audience: this.jwtConfiguration.audience,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  private generateResetToken(): string {
    const token: string = uuidv4();
    return token;
  }

  private async sendResetEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    console.log(this.request.protocol);
    const resetURL = `${this.request.protocol}://${this.request.get(
      'host',
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a request with your new password and confirm it to : ${resetURL}. \n If you didn't forget your password. Ignore this email`;
    try {
      await this.mailingService.sendMail({
        to: email,
        subject: 'Reset Your password',
        html: `<p>Please click the link below to reset your password:<a href="{{resetURL}}">Reset Password</a></p><br><p>If you didn't request this, you can safely ignore this email.</p>`,
        text: message,
        context: { resetURL },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
