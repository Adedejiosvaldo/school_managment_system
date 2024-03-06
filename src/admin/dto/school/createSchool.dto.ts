import { IsString } from 'class-validator';

export class createSchoolDTO {
  @IsString()
  name: string;
  @IsString()
  address: string;
}
