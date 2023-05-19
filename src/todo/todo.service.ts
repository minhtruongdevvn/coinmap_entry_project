import { TodoRepository } from '@/common/database/repository';
import { Todo, TodoStatus } from '@/common/database/schema';
import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findById(id: string): Promise<Todo> {
    return this.todoRepository.findOne({ id });
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const res = await this.todoRepository.create({
      ...createTodoDto,
    });

    return await res.populate('owner', { hash: 0, hashRt: 0 });
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoRepository.findOneAndUpdate({ id }, updateTodoDto);
  }

  delete(id: string): Promise<void> {
    return this.todoRepository.findOneAndDelete({ id });
  }

  updateStatus(userId: string, todoId: string, status: TodoStatus) {
    return this.todoRepository.findOneAndUpdate(
      {
        owner: userId,
        _id: todoId,
      },
      {
        status,
      },
    );
  }
}
