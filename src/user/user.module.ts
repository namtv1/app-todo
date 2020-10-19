import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';

import { User } from './user.entity';

import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],

  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
