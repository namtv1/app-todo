import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email: email });
  }

  async login(login: LoginDto): Promise<User> {
    const user = await this.findByEmail(login.email);
    if (!user) return null;

    const checkPassword = await compare(login.password, user.password);
    if (!checkPassword) return null;

    return user;
  }

  async signup(userDto: CreateUserDto) {
    return await this.usersRepository.save(plainToClass(User, userDto));
  }
}
