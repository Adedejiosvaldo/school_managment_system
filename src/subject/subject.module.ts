import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/class/entity/Class.entity';
import { SubjectRepository } from './repo/subject.generic.repo';
import { Subject } from './entity/Subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Subject])],
  providers: [
    SubjectService,
    { provide: 'SubjectRepo', useClass: SubjectRepository },
  ],
})
export class SubjectModule {}
