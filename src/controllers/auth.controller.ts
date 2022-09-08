import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() { username, password }: AuthDto) {
    return this.authService.login(username, password);
  }

  @Post('/register')
  register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getProfile(@Req() request) {
    return request.user;
  }
}
