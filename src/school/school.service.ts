import {
  BadRequestException,
  ConflictException,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { School } from './entity/School.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// createSchoolDTO
import { ActiveUserDTO } from 'src/iam/authentication/dto/ActiveUser.dto';
import { Admin } from 'src/admin/entity/Admin.entity';
import { createSchoolDTO } from './dto/createSchool.dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class SchoolService {
  constructor(
    @Inject(REQUEST) private request,
    @InjectRepository(School) private readonly schoolRepo: Repository<School>,
    @InjectRepository(Admin) private readonly adminReppo: Repository<Admin>,
  ) {}

  async createNewSchool(body: createSchoolDTO, adminId: ActiveUserDTO) {
    try {
      const admin = await this.adminReppo.findOneBy({ id: +adminId.sub });

      if (!admin) {
        throw new BadRequestException('Admin does not exist');
      }

      const newSchool = await this.schoolRepo.create({
        admin: admin,
        name: body.name,
        address: body.address,
      });
      const newlySavedSchool = await this.schoolRepo.save(newSchool);
      console.log('User', this.request.user);

      this.request.user.schoolID = newlySavedSchool.id;
      return newlySavedSchool;
    } catch (error) {
      const puUniqueViolationErrorCode = '23505';

      if (error.code === puUniqueViolationErrorCode) {
        throw new ConflictException('School Exist already');
      }
      throw new BadRequestException('Bad request', error.message);
    }
  }

  async getAllSchool() {
    return this.schoolRepo.find({ relations: { admin: true } });
  }
}
