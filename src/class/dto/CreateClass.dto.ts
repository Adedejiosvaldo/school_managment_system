import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createClassDTO {
  @IsString()
  //   @IsNotEmpty()
  name: string;

  //   @IsNotEmpty()
  @IsString()
  description?: string;

  @IsNumber()
  numberOfStudentPermitted: number;
}
