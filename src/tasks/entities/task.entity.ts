import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: Status,
    default: Status.TODO,
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user: User;
}
