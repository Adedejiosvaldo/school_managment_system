import { Class } from 'src/class/entity/Class.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(()=>Class, subjectClass=> subjectClass.subject)
  class:Class
}
