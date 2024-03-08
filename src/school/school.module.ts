import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entity/School.entity';
import { Admin } from 'src/admin/entity/Admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School, Admin])],
  providers: [SchoolService],
  controllers: [SchoolController],
})
export class SchoolModule {}
