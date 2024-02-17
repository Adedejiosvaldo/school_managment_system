import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
