import { IsArray, IsString } from 'class-validator';
import { Class } from 'src/class/entity/Class.entity';

export class createSchoolDTO {
  @IsString()
  name: string;
  @IsString()
  address: string;

  //   @IsArray()
  //   classes: Class[];
}
