import { IsNumber, IsString } from 'class-validator';

export class createSubjectDTO {
  @IsNumber()
  classID: number;
  @IsString()
  name: string;
}
