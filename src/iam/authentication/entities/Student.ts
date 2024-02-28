import { Column, Entity, ManyToOne } from 'typeorm';
import { Parent } from './Parent.entity';

@Entity()
export class Student {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column({ default: () => 'now()' })
  dateOfAdmission: Date;

  @ManyToOne(() => Parent, (parent) => parent.students)
  parent: Parent;
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
