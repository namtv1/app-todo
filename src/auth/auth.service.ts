import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginDto } from 'src/user/dto/user.dto';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(login: LoginDto) {
    const user = await this.userService.login(login);
    if (!user) return null;

    const payload = { username: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async signup(userDto: CreateUserDto) {
    return this.userService.signup(userDto);
  }
}
