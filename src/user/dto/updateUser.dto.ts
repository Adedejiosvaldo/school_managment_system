import { PartialType } from '@nestjs/mapped-types';
import { createUserDTO } from './createUser.dto';

export class UpdateUserDTO extends PartialType(createUserDTO) {}
