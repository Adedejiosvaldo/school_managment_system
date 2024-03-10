import { Class } from 'src/class/entity/Class.entity';
import { School } from 'src/school/entity/School.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'teacher' })
  role: string;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ nullable: true })
  resetTokenExpiresIn: Date;

  @ManyToOne(() => School, (school) => school.teachers)
  school: School;

  @OneToOne(() => Class, (schoolClass) => schoolClass.teacher)
  @JoinColumn()
  class: Class;
}
