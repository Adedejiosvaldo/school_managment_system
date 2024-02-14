import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { createUserDTO } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAllUsers() {
    return this.userService.getAll();
  }

  @Get(':id')
  getAUser(@Param('id') userId: string) {
    return this.userService.getAUser(userId);
  }

  @Post()
  creatrUser(@Body() body: createUserDTO) {
    return this.userService.createNewUser(body);
  }

  @Patch(':id')
  updateAUser(@Param('id') userId: string, @Body() body: UpdateUserDTO) {
    return this.userService.updateCoffe(userId, body);
  }

  @Delete(':id')
  deleteAUser(@Param('id') userId) {
    return this.userService.deleteCoffee(userId);
  }
}
