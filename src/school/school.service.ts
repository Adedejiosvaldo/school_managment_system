import { BadRequestException, Injectable } from '@nestjs/common';
import { School } from './entity/School.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// createSchoolDTO
import { ActiveUserDTO } from 'src/iam/authentication/dto/ActiveUser.dto';
import { Admin } from 'src/admin/entity/Admin.entity';
import { createSchoolDTO } from './dto/createSchool.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School) private readonly schoolRepo: Repository<School>,
    @InjectRepository(Admin) private readonly adminReppo: Repository<Admin>,
  ) {}

  async createNewSchool(body: createSchoolDTO, adminId: ActiveUserDTO) {
    const admin = await this.adminReppo.findOneBy({ id: +adminId.sub });

    if (!admin) {
      throw new BadRequestException('Admin does not exist');
    }

    const newSchool = await this.schoolRepo.create({
      admin: admin,
      name: body.name,
      address: body.address,
    });
    return this.schoolRepo.save(newSchool);
  }

  async getAllSchool() {
    return this.schoolRepo.find({ relations: { admin: true } });
  }
}
