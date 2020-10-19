import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ObjectID, Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}

  async findById(todoId: ObjectID) {
    return await this.todosRepository.findOne(todoId);
  }

  async index(authorId: ObjectID): Promise<Todo[]> {
    console.log(authorId);
    return await this.todosRepository.find({ author: authorId });
  }

  async create(todoData: CreateTodoDto): Promise<Todo> {
    return await this.todosRepository.save(plainToClass(Todo, todoData));
  }

  async update(todoId: ObjectID, todoData: CreateTodoDto) {
    const todo = await this.findById(todoId);
    if (!todo) return null;

    return await this.todosRepository.save(plainToClass(Todo, todoData));
  }

  async delete(todoId: ObjectID) {
    const todo = await this.findById(todoId);

    if (!todo) return null;

    return await this.todosRepository.remove(todo);
  }
}
