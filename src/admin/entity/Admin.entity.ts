import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { School } from './School.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => School, (school) => school.admin)
  schools: School[];

  @Column({ default: 'admin' })
  role: string;
}
