// // @Injectable()
// // export class BaseAuthServiceALL {
// // //   constructor(
// // //     @InjectRepository(Teacher)
// // //     private readonly teacherRepo: Repository<Teacher>,
// // //     private readonly hashingService: BcryptService,
// // //     private readonly jwtService: JwtService,
// // //     @Inject(jwtConfig.KEY)
// // //     private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
// // //   ) {}

// // //   private async generateToken(user: Teacher): Promise<string> {
// // //     const accessToken = await this.signToken<Partial<ActiveUserDTO>>(
// // //       user.id,
// // //       this.jwtConfiguration.accessTokenTTL,
// // //       { email: user.email, role: user.role },
// // //     );

// // //     // user.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000;
// // //     return accessToken;
// // //   }

// // //   private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
// // //     return await this.jwtService.sign(
// // //       { sub: userId, ...payload },
// // //       {
// // //         issuer: this.jwtConfiguration.issuer,
// // //         audience: this.jwtConfiguration.audience,
// // //         secret: this.jwtConfiguration.secret,
// // //         expiresIn,
// // //       },
// // //     );
// // //   }

// // //   async createAccount(dto: CreateUser) {
// // //     try {
// // //       // Extract password and rest of the DTO properties
// // //       const { password } = dto;

// // //       const hashedPassword: string = await this.hashingService.hash(password);

// // //       const newUser = await this.teacherRepo.create({
// // //         ...dto,
// // //         password: hashedPassword,
// // //       });

// // //       const accessToken = await this.generateToken(newUser);
// // //       await this.teacherRepo.save(newUser);
// // //       return { accessToken, user: newUser };
// // //     } catch (error) {
// // //       const puUniqueViolationErrorCode = '23505';

// // //       if (error.code === puUniqueViolationErrorCode) {
// // //         throw new ConflictException('Email has been used already');
// // //       }
// // //     }
// // //   }
// // //   //   async createAccount<V extends object>(dto: V): Promise<AuthResponse<T>> {
// // //   //     try {
// // //   //       const errors = await validate(dto);
// // //   //       if (errors.length > 0) {
// // //   //         // Throw an error with validation messages
// // //   //         const messages = errors
// // //   //           .map((error) => Object.values(error.constraints))
// // //   //           .join(', ');
// // //   //         throw new Error(messages);
// // //   //       }

// // //   //       // / Ensure that password is defined
// // //   //       if (!('password' in dto)) {
// // //   //         throw new Error('Password is required');
// // //   //       }

// // //   //       // Extract password and rest of the DTO properties
// // //   //       const { password, ...rest } = dto as { password: string };

// // //   //       const hashedPassword: string = await this.hashingService.hash(password);

// // //   //       const newUser = await this.repository.create({
// // //   //         ...rest,
// // //   //         password: hashedPassword,
// // //   //       } as any);

// // //   //       const accessToken = await this.generateToken(newUser);
// // //   //       await this.repository.save(newUser);
// // //   //       return { accessToken, user: newUser };
// // //   //     } catch (error) {
// // //   //       const puUniqueViolationErrorCode = '23505';

// // //   //       if (error.code === puUniqueViolationErrorCode) {
// // //   //         throw new ConflictException('Email has been used already');
// // //   //       }
// // //   //     }
// // //   //   }

// // //   async login(dto: LoginDTO): Promise<string> {
// // //     try {
// // //       const { email, password } = dto;
// // //       const user = await this.teacherRepo.findOneBy({ email });

// // //       if (!user) {
// // //         throw new Error('User not found');
// // //       }

// // //       // Verify if the provided password matches the hashed password
// // //       // (you need to implement a password hashing and comparison function)
// // //       const isPasswordValid = await this.hashingService.compare(
// // //         password,
// // //         user.password,
// // //       );
// // //       if (!isPasswordValid) {
// // //         throw new Error('Invalid password');
// // //       }

// // //       // Generate and return an access token
// // //       const accessToken = await this.generateToken(user);
// // //       return accessToken;
// // //     } catch (error) {
// // //       console.error('Error during login:', error);
// // //       throw new Error('An error occurred during login');
// // //     }
// // //   }
// // // }

// // // // Generic Auth Service
// // }

// import {
//   Injectable,
//   BadRequestException,
//   ConflictException,
//   NotFoundException,
//   UnauthorizedException,
//   Inject,
// } from '@nestjs/common';
// import { InjectEntityManager, EntityManager } from '@nestjs/typeorm';
// import { Repository, DeepPartial } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';
// import { BcryptService } from '../hashing/bcrypt.auth';
// import { ConfigService, ConfigType } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';
// import jwtConfig from '../config/jwt.config';
// import { MailerService } from '@nestjs-modules/mailer'; // (Optional)
// import { Request } from 'express';

// @Injectable()
// export class AuthenticationService<Entity> {
//   constructor(
//     private readonly entityManager: EntityManager,
//     private readonly hashingService: BcryptService,
//     private readonly jwtService: JwtService,
//     private readonly mailingService: MailerService, // (Optional)
//     @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
//     @Inject('REQUEST') private readonly request: Request, // (Optional) for email reset link generation
//   ) {}

//   private getEntityRepository<Entity>(): Repository<Entity> {
//     return this.entityManager.getCustomRepository(Entity.name + 'Repository');
//   }

//   // Generic signup function for any entity
//   async signup<SignupDto extends { email: string; password: string }>(
//     body: SignupDto,
//   ): Promise<Entity | undefined> {
//     try {
//       const { email, password } = body;
//       const hashedPassword: string = await this.hashingService.hash(password);
//       const newEntity = this.getEntityRepository<Entity>().create({
//         email,
//         password: hashedPassword,
//         // Add other entity-specific fields here
//       });
//       const existingEntity = await this.getEntityRepository<Entity>().findOneBy({ email });
//       if (existingEntity) {
//         throw new ConflictException('Email already exists');
//       }
//       const savedEntity = await this.getEntityRepository<Entity>().save(newEntity);
//       return savedEntity;
//     } catch (error) {
//       if (error.code === '23505') {
//         // Unique constraint violation for email
//         throw new ConflictException('Email already exists');
//       } else {
//         throw error;
//       }
//     }
//   }

//   // Generic login function for any entity with username and password fields
//   async login<Credentials extends { username: string; password: string }>(
//     credentials: Credentials,
//   ): Promise<Entity | undefined> {
//     const { username, password } = credentials;
//     const entity = await this.getEntityRepository<Entity>().findOneBy({ username });
//     if (!entity) {
//       throw new UnauthorizedException('Invalid username or password');
//     }
//     const isPasswordCorrect = await this.hashingService.compare(
//       password,
//       entity.password,
//     );
//     if (!isPasswordCorrect) {
//       throw new UnauthorizedException('Invalid username or password');
//     }
//     return entity;
//   }

//   // Forgot password functionality (Optional)
//   async forgotPassword<Credentials extends { email: string }>(
//     credentials: Credentials,
//   ): Promise<void> {
//     try {
//       const { email } = credentials;
//       const entity = await this.getEntityRepository<Entity>().findOneBy({ email });
//       if (!entity) {
//         throw new NotFoundException('User not found');
//       }
//       const token = this.generateResetToken();
//       const expiresIn = new Date();
//       expiresIn.setMinutes(expiresIn.getMinutes() + 10); // Set expiration time (e.g., 10 minutes)
//       entity.resetToken = token;
//       entity.resetTokenExpiresIn = expiresIn;
//       await this.getEntityRepository<Entity>().save(entity);

//       // Send reset email notification (Optional)
//       if (this.mailingService) {
//         const resetURL = `<span class="math-inline">\{this\.request\.protocol\}\://</span>{this.request.get(
//           'host',
//         )}/auth/reset-password/${token}`;
//         const message = `Forgot your password? Submit a request with your new password and confirm it to : ${resetURL}. \n If you didn't forget your password. Ignore this email`;
//         await this.mailingService.sendMail({
//           to
