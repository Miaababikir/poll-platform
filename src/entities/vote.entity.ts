import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Option } from './option.entity';
import { Poll } from './poll.entity';
import { Base } from './base.entity';

@Entity()
export class Vote extends Base {
  @Column({ nullable: true })
  pollId: number;

  @Column({ nullable: true })
  optionId: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => Poll)
  poll: Poll;

  @ManyToOne(() => Option)
  option: Option;

  @ManyToOne(() => User)
  user: User;
}
