import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class createUserDTO {
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
