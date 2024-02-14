import { IsString, IsStrongPassword } from 'class-validator';

export class createUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsStrongPassword()
  password: string;
}
