import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PollService } from '../services/poll.service';

@Controller('/api/profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(private pollService: PollService) {}

  @Get('/polls')
  getPolls(@Req() { user }) {
    return this.pollService.getUserPolls(user.id);
  }
}
