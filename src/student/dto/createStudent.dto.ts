import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateStudentDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  classID: number;
}
