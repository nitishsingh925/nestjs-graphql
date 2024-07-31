import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import * as jwt from 'jsonwebtoken';
import { User } from './entities/user.entiy';
import { ConfigService } from '@nestjs/config';

@Resolver()
export class UserResolver {
  constructor(private readonly configService: ConfigService) {}

  @Query(() => String)
  @UseGuards(AuthGuard)
  login(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User,
  ): string {
    const payload = {
      id: user.id,
      name: user.firstName + ' ' + user.lastName,
      email: user.email,
      role: user.role,
    };
    // get from env file
    const jwtSecret = this.configService.getOrThrow<string>('JWT_SECRET');
    const jwtExpiresIn =
      this.configService.getOrThrow<string>('JWT_EXPIRES_IN');

    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
    return token;
  }
}
