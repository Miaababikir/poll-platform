import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Option } from './option.entity';
import { Base } from './base.entity';

@Entity()
export class Poll extends Base {
  @Column()
  title: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.polls)
  user: User;

  @OneToMany(() => Option, (option) => option.poll)
  options: Option[];

  @Column('date')
  expireAt;
}
