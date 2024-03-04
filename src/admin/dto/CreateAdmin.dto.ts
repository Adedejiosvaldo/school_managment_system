import { IsNotEmpty, IsString } from 'class-validator';

export class AdminDTO {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  schoolName: string;

}
