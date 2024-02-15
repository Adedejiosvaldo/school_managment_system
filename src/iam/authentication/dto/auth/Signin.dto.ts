import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
