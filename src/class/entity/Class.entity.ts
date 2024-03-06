import { School } from 'src/school/entity/School.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  studentNumber: number;

  @ManyToOne(() => School, (school) => school.classes)
  school: School;
}
