import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  //   IsString()
  @IsStrongPassword()
  password: string;
}
