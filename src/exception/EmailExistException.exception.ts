import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameAlreadyExist extends HttpException {
  constructor() {
    super('Email Already Exist', HttpStatus.CONFLICT);
  }
}
