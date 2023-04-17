import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GetUser } from 'src/common/decorator';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.service.create(createTodoDto);
  }

  @Put(':id/:status')
  async updatestatus(
    @Param('id') id: string,
    @Param('status', ParseIntPipe) status: number,
    @GetUser('sub') userId: string,
  ) {
    await this.service.updateStatus(userId, id, status);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.service.update(id, updateTodoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
