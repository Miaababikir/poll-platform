import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { VoteService } from '../services/vote.service';
import { CreateVoteDto } from '../dto/createVote.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/votes')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  store(@Body() createVoteDto: CreateVoteDto, @Req() request) {
    return this.voteService.createVote(createVoteDto, request.user);
  }
}
