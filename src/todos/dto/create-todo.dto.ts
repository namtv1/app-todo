import { IsNotEmpty } from 'class-validator';
import { ObjectID } from 'typeorm';

export class CreateTodoDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  author: ObjectID;
}
