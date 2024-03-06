import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
