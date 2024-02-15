import {
  Body,
  Catch,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { createUserDTO } from '../iam/authentication/dto/createUser.dto';
import { UserService } from './user.service';
import { UpdateUserDTO } from '../iam/authentication/dto/updateUser.dto';
import { QueryFailedFilter } from 'src/exception/EmailExist.query';

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

  @UseFilters(new QueryFailedFilter())
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
