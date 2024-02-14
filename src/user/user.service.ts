import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { createUserDTO } from './dto/createUser.dto';
import { NotFoundError } from 'rxjs';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {}

  async getAll() {
    const user = await this.userModel.find();
    if (!user) {
      throw new NotFoundException('No USER CURRently exist');
    }
    return { user, numberOfUsers: user.length };
  }

  async getAUser(id: string) {
    const coffee = await this.userModel.findOneBy({ id: +id });
    if (!coffee) {
      throw new NotFoundException('User Id Not Dound');
    }
    return coffee;
  }

  async createNewUser(body: createUserDTO) {
    try {
      const { email } = body;
      const existingUser = await this.userModel.findOneBy({ email });
      if (existingUser) {
        throw new ConflictException('User Already Exist');
      }
      const user = await this.userModel.create({ ...body });
      return this.userModel.save(user);
    } catch (error) {
      console.log('error:', error.message);
    }
  }

  //   Update
  async updateCoffe(id: string, updateCoffeeDTO: UpdateUserDTO) {
    const coffee = await this.userModel.preload({
      id: +id,
      ...updateCoffeeDTO,
    });

    if (!coffee) {
      return new NotFoundException('ID not found');
    }
    return this.userModel.save(coffee);
  }

  async deleteCoffee(id: string) {
    const coffee = await this.userModel.findOneBy({ id: +id });
    return this.userModel.remove(coffee);
  }
}
