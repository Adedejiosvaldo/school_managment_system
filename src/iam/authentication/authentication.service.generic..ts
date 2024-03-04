import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { BaseAuthService } from './generic/base.auth.service';
import { FindOneOptions, Repository } from 'typeorm';
import { BcryptService } from '../hashing/bcrypt.auth';
import { ActiveUserDTO } from './dto/ActiveUser.dto';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User } from 'src/user/entity/user.entity';
// import { Student } from './entities/Student.entity';
import { createClassDTO } from 'src/class/dto/CreateClass.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from './dto/auth/createUser.dto';
import { validate } from 'class-validator';

export interface AuthResponse<T> {
  accessToken: string;
  user: T[];
}
interface IfindOneByEmail<T> extends FindOneOptions<T> {
  email: string;
}

interface UserWithPassword {
  password: string;
  // Other properties common to users...
}

@Injectable()
export class BaseAuthServiceALL<T extends UserWithPassword> {
  constructor(
    private readonly hashingService: BcryptService,
    private readonly repository: Repository<T>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  private async generateToken<Z>(user: Z): Promise<string> {
    const accessToken = await this.signToken<Partial<ActiveUserDTO>>(
      user['id'],
      this.jwtConfiguration.accessTokenTTL,
      { email: user['email'], role: user['role'] },
    );

    // user.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000;
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

  async student(dto: CreateUser): Promise<AuthResponse<T>> {
    return await this.createAccount<CreateUser>(dto);
    // return createAccount;
  }

  async createAccount<V extends object>(dto: V): Promise<AuthResponse<T>> {
    try {
      const errors = await validate(dto);
      if (errors.length > 0) {
        // Throw an error with validation messages
        const messages = errors
          .map((error) => Object.values(error.constraints))
          .join(', ');
        throw new Error(messages);
      }

      // / Ensure that password is defined
      if (!('password' in dto)) {
        throw new Error('Password is required');
      }

      // Extract password and rest of the DTO properties
      const { password, ...rest } = dto as { password: string };

      const hashedPassword: string = await this.hashingService.hash(password);

      const newUser = await this.repository.create({
        ...rest,
        password: hashedPassword,
      } as any);

      const accessToken = await this.generateToken(newUser);
      await this.repository.save(newUser);
      return { accessToken, user: newUser };
    } catch (error) {
      const puUniqueViolationErrorCode = '23505';

      if (error.code === puUniqueViolationErrorCode) {
        throw new ConflictException('Email has been used already');
      }
    }
  }

  async login<V extends object>(dto: V): Promise<string> {
    try {
      // Validate the login DTO
      const errors = await validate(dto);
      if (errors.length > 0) {
        const messages = errors
          .map((error) => Object.values(error.constraints))
          .join(', ');
        throw new Error(messages);
      }

      if (!('email' in dto) || !('password' in dto)) {
        throw new Error('Email and password are required');
      }
      const { email, password } = dto as { email: string; password: string };
      const options: IfindOneByEmail<T> = { email };
      // Fetch user from the repository based on the provided email
      const user = await this.repository.findOne(options);

      if (!user) {
        throw new Error('User not found');
      }

      // Verify if the provided password matches the hashed password
      // (you need to implement a password hashing and comparison function)
      const isPasswordValid = await this.hashingService.compare(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      // Generate and return an access token
      const accessToken = await this.generateToken(user);
      return accessToken;
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('An error occurred during login');
    }
  }

  //   forgotPassword(dto: V): Promise<void> {
  //     throw new Error('Method not implemented.');
  //   }
  //   resetPassword(dto: V): Promise<void> {
  //     throw new Error('Method not implemented.');
  //   }
  //   updatePassword(dto: V): Promise<void> {
  //     throw new Error('Method not implemented.');
  //   }
}

// Generic Auth Service
