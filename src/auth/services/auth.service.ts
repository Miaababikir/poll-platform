import { UserService } from './user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (!user) throw new ForbiddenException('Access Denied');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new ForbiddenException('Access Denied');
    }

    const access_token = await this.generateToken({
      sub: user.id,
      username: user.username,
    });

    return {
      access_token,
      username: user.username,
    };
  }

  async register(body: RegisterDto) {
    return this.userService.createUser(body);
  }

  async generateToken(payload) {
    return this.jwt.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
