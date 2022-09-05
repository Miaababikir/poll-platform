import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
  }
}
