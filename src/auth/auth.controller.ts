import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { CreateUserDto, LoginDto } from 'src/user/dto/user.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() login: LoginDto) {
    const user = await this.authService.login(login);
    if (!user) throw new NotFoundException('Login Faild!');

    return user;
  }

  @Post('signup')
  async signup(@Body() userDto: CreateUserDto) {
    const user = await this.authService.signup(userDto);
    if (!user) throw new NotFoundException('Signup Faild');

    return user;
  }
}
