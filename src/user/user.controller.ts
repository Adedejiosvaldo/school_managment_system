import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { createUserDTO } from './dto/createUser.dto';

@Controller('users')
export class UserController {
  @Get()
  getAllUsers() {
    return 'Getting all users';
  }

  @Get(':id')
  getAUser(@Param('id') userId) {
    return 'Getting a User';
  }

  @Post()
  creatrUser(body: createUserDTO) {
    return 'User created';
  }

  @Patch(':id')
  updateAUser(@Param('id') userId, body: createUserDTO) {
    return 'Updated';
  }

  @Delete(':id')
  deleteAUser(@Param('id') userId) {
    return 'deleted';
  }
}
