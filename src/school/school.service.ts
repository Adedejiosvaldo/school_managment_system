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
    const AdminExist = await this.adminReppo.findOneBy({ id: +adminId.sub });

    if (!AdminExist) {
      throw new BadRequestException('Admin does not exist');
    }
    const newSchool = await this.schoolRepo.create({
      admin: adminId,
      name: body.name,
      address: body.address,
      //   classes: body.classes,
      //   classes:body
    });
    return this.schoolRepo.save(newSchool);
  }
}
