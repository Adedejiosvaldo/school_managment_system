import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from '../../admin/entity/Admin.entity';
import { Class } from 'src/class/entity/Class.entity';
import { Teacher } from 'src/teacher/entity/Teacher.entity';

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  address: string;

  @ManyToOne(() => Admin, (admin) => admin.schools)
  admin: Admin;

  @OneToMany(() => Class, (studentClass) => studentClass.school)
  classes: Class;

  //   @OneToMany(() => Teacher, (teacher) => teacher.school)
  //   @JoinColumn()
  //   teachers: Teacher[];
}
