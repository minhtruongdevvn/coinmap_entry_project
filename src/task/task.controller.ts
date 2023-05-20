import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { GetUser, Roles } from 'src/common/decorator';
import { Role } from 'src/common/enum';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Roles(Role.MANAGER)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.service.create(createTaskDto);
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
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.service.update(id, updateTaskDto);
  }

  @Roles(Role.MANAGER)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
