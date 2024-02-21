import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entity/Class.entity';
import { ClassRepository } from './repository/class.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  controllers: [ClassController],
  providers: [
    ClassService,
    { provide: 'ClassRepositoryInterface', useClass: ClassRepository },
  ],
})
export class ClassModule {}
