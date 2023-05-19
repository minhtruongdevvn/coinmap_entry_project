import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { GetUser, Roles } from 'src/common/decorator';
import { Role } from 'src/common/enum';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Roles(Role.MANAGER)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.service.create(createTodoDto);
  }

  @Put(':id/:status')
  async updateStatus(
    @Param('id') id: string,
    @Param('status' /*ParseIntPipe*/) status: number,
    // no need the ParseIntPipe bc of ValidationPipe({transform: true})
    @GetUser('sub') userId: string,
  ) {
    await this.service.updateStatus(userId, id, status);
  }

  @Roles(Role.MANAGER)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.service.update(id, updateTodoDto);
  }

  @Roles(Role.MANAGER)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
