import { Column, Entity, OneToMany } from 'typeorm';
import { Poll } from './poll.entity';
import { Base } from './base.entity';

@Entity()
export class User extends Base {
  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Poll, (poll) => poll.user)
  polls: Poll[];
}
