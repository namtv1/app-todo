import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guard/jwt.guard';
import { TodoBody } from 'src/decorators/todo.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { ObjectID } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';

import { TodosService } from './todos.service';
import { ValidationObjectId } from 'src/validators/object-id.pipe';

@Controller('todos')
@UseGuards(JwtGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async index(@CurrentUser() user: any) {
    const todos = await this.todosService.index(user.sub);

    if (!todos) throw new NotFoundException();

    return { message: 'Get Todo success', statusCode: HttpStatus.OK, todos };
  }

  @Post()
  async create(@TodoBody() todoData: CreateTodoDto) {
    const todo = await this.todosService.create(todoData);

    if (!todo) throw new NotFoundException();

    return {
      message: 'Create todo scuccess',
      statusCode: HttpStatus.CREATED,
      todo,
    };
  }

  @Put('/:id')
  async update(
    @Param('id', new ValidationObjectId()) todoId: ObjectID,
    @TodoBody() todoData: CreateTodoDto,
  ) {
    const todo = await this.todosService.update(todoId, todoData);

    if (!todo) throw new NotFoundException();

    return { message: 'Update Todo success', statusCode: HttpStatus.OK, todo };
  }

  @Delete('/:id')
  async delete(@Param('id', new ValidationObjectId()) todoId: ObjectID) {
    const todo = await this.todosService.delete(todoId);

    if (!todo) throw new NotFoundException();

    return { message: 'Delete Todo success', statusCode: HttpStatus.OK, todo };
  }
}
