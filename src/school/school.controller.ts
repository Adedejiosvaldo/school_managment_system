import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { ActiveUserDTO } from 'src/iam/authentication/dto/ActiveUser.dto';
import { AuthType } from 'src/iam/authentication/enum/auth.type';
import { Roles } from 'src/iam/authorization/decorators/Role.decorators';
import { Role } from 'src/iam/authorization/enum/Role';
import { SchoolService } from './school.service';
import { createSchoolDTO } from './dto/createSchool.dto';
import { ActiveUser } from 'src/iam/authentication/decorators/ActiveUser.decorator';

@Auth(AuthType.Bearer)
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  @Get()
  justARes() {
    return 'Hello';
  }

  @Roles(Role.Admin)
  @Post()
  createSchool(
    @Body() body: createSchoolDTO,
    @ActiveUser() req: ActiveUserDTO,
  ) {
    return this.schoolService.createNewSchool(body, req);
  }
}
