import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/class/entity/Class.entity';
import { SubjectRepository } from './repo/subject.generic.repo';
import { Subject } from './entity/Subject.entity';
import { ClassRepository } from 'src/class/repository/class.repo';
import { SubjectController } from './subject.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Subject])],
  providers: [
    SubjectService,
    { provide: 'SubjectRepo', useClass: SubjectRepository },
    { provide: 'ClassRepositoryInterface', useClass: ClassRepository },
  ],
  controllers: [SubjectController],
})
export class SubjectModule {}
