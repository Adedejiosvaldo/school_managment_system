import { ExecutionContext, Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entity/School.entity';
import { Admin } from 'src/admin/entity/Admin.entity';
import { Class } from 'src/class/entity/Class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School, Admin, Class])],
  providers: [SchoolService],
  controllers: [SchoolController],
})
export class SchoolModule {}
