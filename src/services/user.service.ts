import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async createUser({ username, password }: AuthDto): Promise<User> {
    const user = this.userRepository.create({
      username,
      password: await bcrypt.hash(password, 10),
    });

    return this.userRepository.save(user);
  }
}
