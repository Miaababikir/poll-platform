import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from '../dto/createVote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from '../entities/poll.entity';
import { Repository } from 'typeorm';
import { Option } from '../entities/option.entity';
import { Vote } from '../entities/vote.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Poll) private pollRepository: Repository<Poll>,
    @InjectRepository(Option) private optionRepository: Repository<Option>,
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
  ) {}

  createVote(createVoteDto: CreateVoteDto, user: User) {
    const vote = this.voteRepository.create({
      poll: { id: createVoteDto.pollId },
      option: { id: createVoteDto.optionId },
      user: { id: user.id },
    });

    return this.voteRepository.save(vote);
  }

  async getUserVote(userId: number, pollId: number): Promise<Vote> {
    return await this.voteRepository.findOneBy({
      poll: { id: pollId },
      user: { id: userId },
    });
  }

  async getPollVotes(pollId: number) {
    const data = await this.optionRepository
      .createQueryBuilder('option')
      .leftJoin('option.poll', 'poll')
      .leftJoin('option.votes', 'vote')
      .select('option.title', 'title')
      .addSelect('COUNT(vote.id)', 'total')
      .where('option.pollId = :pollId', { pollId })
      .groupBy('option.id')
      .getRawMany();

    return data.reduce(
      (initial, item) => {
        return {
          ...initial,
          labels: [...initial.labels, item.title],
          data: [...initial.data, item.total],
        };
      },
      { labels: [], data: [] },
    );
  }
}
