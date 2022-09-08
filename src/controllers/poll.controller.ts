import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Poll } from '../entities/poll.entity';
import { CreatePollDto } from '../dto/createPoll.dto';
import { PollService } from '../services/poll.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/polls')
export class PollController {
  constructor(private pollService: PollService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  index(): Poll[] {
    return [];
  }

  @Post('/')
  store(@Body() createPollDto: CreatePollDto, @Req() request) {
    return this.pollService.createPoll(createPollDto, request.user);
  }
}
