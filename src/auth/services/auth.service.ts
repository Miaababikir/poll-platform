import { UserService } from './user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && user.password === bcrypt.hash(password)) {
      return this.jwt.signAsync({
        sub: user.id,
        username: user.username,
      });
    }

    return { status: 404 };
  }
}
