import { PartialType } from '@nestjs/mapped-types';
import { CreateUser } from '../createUser.dto';

export class studentSignUpDTO extends PartialType(CreateUser) {
  role: string;
}
