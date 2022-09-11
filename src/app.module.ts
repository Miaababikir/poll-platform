import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Poll } from './entities/poll.entity';
import { Option } from './entities/option.entity';
import { Vote } from './entities/vote.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { PollController } from './controllers/poll.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PollService } from './services/poll.service';
import { VoteService } from './services/vote.service';
import { VoteController } from './controllers/vote.controller';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Poll, Option, Vote],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Poll, Option, Vote]),
  ],
  controllers: [
    AuthController,
    PollController,
    VoteController,
    ProfileController,
  ],
  providers: [AuthService, UserService, PollService, VoteService, JwtStrategy],
})
export class AppModule {}
