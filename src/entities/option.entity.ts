import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Poll } from './poll.entity';
import { Base } from './base.entity';
import { Vote } from './vote.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Option extends Base {
  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column({ nullable: true })
  pollId: number;

  @ManyToOne(() => Poll, (poll) => poll.options)
  poll: Poll;

  @OneToMany(() => Vote, (vote) => vote.option)
  votes: Vote[];
}
