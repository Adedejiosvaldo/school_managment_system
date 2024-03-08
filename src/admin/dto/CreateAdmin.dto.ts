import { IsNotEmpty, IsString } from 'class-validator';

export class createAdminDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
