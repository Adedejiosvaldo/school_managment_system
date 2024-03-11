import { IsNumber, IsString } from 'class-validator';

export class CreateTeacherDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  classID: number;
}
