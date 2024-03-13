import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enum/auth.type';
import { LoginDTO } from 'src/iam/dto/login.dto';
import { CreateStudentDTO } from 'src/student/dto/createStudent.dto';
import { StudentService } from 'src/student/student.service';

@Auth(AuthType.None)
@Controller('auth/students')
export class StudentAuthController {
  constructor(private readonly studentService: StudentService) {}

  @Post('signup')
  async createStudent(@Body() body: CreateStudentDTO) {
    return this.studentService.createAStudent(body);
  }
  @Post('login')
  async loginStudent(@Body() body: LoginDTO) {
    return this.studentService.loginStudent(body);
  }
}
