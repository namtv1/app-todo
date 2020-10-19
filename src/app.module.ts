import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AuthModule } from './auth/auth.module';

import { UserModule } from './user/user.module';
import { TodosModule } from './todos/todos.module';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ValidatorsModule } from './validators/validators.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
    }),
    UserModule,
    AuthModule,
    TodosModule,
    DatabaseModule,
    ValidatorsModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
