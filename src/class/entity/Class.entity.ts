import { School } from 'src/school/entity/School.entity';
import { Student } from 'src/student/entity/Student.entity';
import { Subject } from 'src/subject/entity/Subject.entity';
import { Teacher } from 'src/teacher/entity/Teacher.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  numberOfStudentPermitted: number;

  @ManyToOne(() => School, (school) => school.classes)
  school: School;

  @OneToOne(() => Teacher, (teacher) => teacher.class)
  @JoinColumn()
  teacher: Teacher;

  @OneToMany(() => Subject, (subjects) => subjects.class)
  subject: Subject[];

  @ManyToMany(() => Student, (student) => student.class)
  students: Student[];
}
