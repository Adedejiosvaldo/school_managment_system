import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entity/Class.entity';
import { ClassRepository } from './repository/class.repo';
import { BaseAuthServiceALL } from 'src/iam/authentication/authentication.service.generic.';
import { IamModule } from 'src/iam/iam.module';
import { School } from 'src/school/entity/School.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, School]), IamModule],
  controllers: [ClassController],
  providers: [
    ClassService,
    { provide: 'ClassRepositoryInterface', useClass: ClassRepository },
  ],
})
export class ClassModule {}
