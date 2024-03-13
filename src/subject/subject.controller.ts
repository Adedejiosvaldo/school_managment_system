import { Body, Controller, Post } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { createSchoolDTO } from 'src/school/dto/createSchool.dto';
import { createSubjectDTO } from './dto/createSubject.dto';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enum/auth.type';
import { Roles } from 'src/iam/authorization/decorators/Role.decorators';
import { Role } from 'src/iam/authorization/enum/Role';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectServices: SubjectService) {}

  @Auth(AuthType.Bearer)
  @Roles(Role.Admin, Role.Teacher)
  @Post()
  async createSubject(@Body() body: createSubjectDTO) {
    return this.subjectServices.createSubject(body);
  }
}
