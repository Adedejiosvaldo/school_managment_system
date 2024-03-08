import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { ActiveUserDTO } from 'src/iam/authentication/dto/ActiveUser.dto';
import { AuthType } from 'src/iam/authentication/enum/auth.type';
import { Roles } from 'src/iam/authorization/decorators/Role.decorators';
import { Role } from 'src/iam/authorization/enum/Role';
import { SchoolService } from './school.service';
import { createSchoolDTO } from './dto/createSchool.dto';

@Auth(AuthType.Bearer)
@Roles(Role.Admin)
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  @Get()
  justARes() {
    return 'Hello';
  }
  @Post()
  createSchool(@Body() body: createSchoolDTO, @Req() req: ActiveUserDTO) {
    return this.schoolService.createNewSchool(body, req);
  }
}
