import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createAdminDTO } from './dto/CreateAdmin.dto';
import { AdminService } from './admin.service';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enum/auth.type';
import { LoginDTO } from 'src/iam/dto/login.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Auth(AuthType.None)
  @Post('auth/signup')
  async createNewAdmin(@Body() body: createAdminDTO) {
    return this.adminService.createAdmin(body);
  }

  @Auth(AuthType.None)
  @Post('auth/login')
  async loginAdmin(@Body() body: LoginDTO) {
    return this.adminService.loginAdmin(body);
  }

  @Auth(AuthType.None)
  @Get()
  getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @Get(':id')
  getAAdmin(@Param(':id') id: number) {
    return this.adminService.getOneAdmin(id);
  }
}
