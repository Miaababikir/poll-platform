import { Injectable } from '@nestjs/common';
import { CreatePollDto } from '../dto/createPoll.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from '../entities/poll.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll) private pollRepository: Repository<Poll>,
  ) {}

  createPoll(createPollDto: CreatePollDto, user: User) {
    const poll = this.pollRepository.create(createPollDto);

    poll.user = user;

    this.pollRepository.save(poll);
  }
}
