import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Parent } from '../../iam/authentication/entities/Parent.entity';
import { Class } from 'src/class/entity/Class.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'student' })
  role: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true })
  rollNumber: string;

  @Column({ default: () => 'now()' })
  dateOfAdmission: Date;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ nullable: true })
  resetTokenExpiresIn: Date;

  @ManyToMany(() => Class, (schoolClass) => schoolClass.students)
  @JoinTable()
  classes: Class[];

  //   @ManyToOne(() => Parent, (parent) => parent.students)
  //   parent: Parent;
}
// +-------------------+      +-------------------+      +-------------------+
// |      Students     |      |      Teachers     |      |      Parents      |
// +-------------------+      +-------------------+      +-------------------+
// | id: int           |      | id: int           |      | id: int           |
// | first_name: string|      | first_name: string|      | first_name: string|
// | last_name: string |      | last_name: string |      | last_name: string |
// | date_of_birth: date|     | date_of_birth: date|     | date_of_birth: date|
// | grade: string     |      | subject: string   |      | job: string       |
// | parent_id: int    |      +-------------------+      | student_id: int   |
// |                   |      |                   |      |                   |
// |                   |      +-------------------+      |                   |
// +-------------------+              |                 +-------------------+
//               |                    |
//               |                    |
//               +------------------+
//                              |
//                              |
//                              v
//                    +-------------------+
//                    |      Courses      |
//                    +-------------------+
//                    | id: int           |
//                    | name: string      |
//                    | teacher_id: int   |
//                    +-------------------+
//                              |
//                              |
//                              v
//                    +-------------------+
//                    |      Grades       |
//                    +-------------------+
//                    | id: int           |
//                    | course_id: int    |
//                    | student_id: int   |
//    | grade: string
