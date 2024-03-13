import { Controller, Get } from '@nestjs/common';
import { StudentService } from './student.service';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enum/auth.type';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Auth(AuthType.None)
  @Get('studentsInfo')
  getAllInfo() {
    return this.studentService.getStudentInfo();
  }
}
