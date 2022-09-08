import { Injectable } from '@nestjs/common';
import { CreatePollDto } from '../dto/createPoll.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from '../entities/poll.entity';
import { Repository } from 'typeorm';
import { Option } from '../entities/option.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll) private pollRepository: Repository<Poll>,
    @InjectRepository(Option) private optionRepository: Repository<Option>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Poll>> {
    const query = this.pollRepository.createQueryBuilder('poll');

    query.leftJoinAndSelect('poll.user', 'user');
    query.orderBy('poll.id', 'DESC');

    return paginate<Poll>(query, options);
  }

  async createPoll(createPollDto: CreatePollDto, user: User): Promise<Poll> {
    const poll = this.pollRepository.create(createPollDto);

    poll.user = user;

    const savedPoll = await this.pollRepository.save(poll);

    poll.options.forEach((option) => {
      this.optionRepository.save({
        ...option,
        poll: savedPoll,
      });
    });

    return savedPoll;
  }
}
