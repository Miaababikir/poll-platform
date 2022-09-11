import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Poll } from '../entities/poll.entity';
import { CreatePollDto } from '../dto/createPoll.dto';
import { PollService } from '../services/poll.service';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { VoteService } from '../services/vote.service';

@Controller('/api/polls')
export class PollController {
  constructor(
    private pollService: PollService,
    private voteService: VoteService,
  ) {}

  @Get()
  index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Poll>> {
    return this.pollService.paginate({ page, limit });
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  store(@Body() createPollDto: CreatePollDto, @Req() request) {
    return this.pollService.createPoll(createPollDto, request.user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  view(@Param('id') id: number, @Req() request) {
    return this.pollService.findById(id, request.user.id);
  }

  @Get('/:id/votes/totals')
  getPollVotesTotal(@Param('id') id: number) {
    return this.voteService.getPollVotes(id);
  }
}
