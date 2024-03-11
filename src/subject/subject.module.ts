import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/class/entity/Class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  providers: [SubjectService],
})
export class SubjectModule {}
