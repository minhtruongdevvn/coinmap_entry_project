import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/common/decorator';
import { Role } from 'src/common/enum';
import { CreateTaskDto, UpdateTaskDto, UpdateTaskStatusDto } from './dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Roles(Role.MANAGER)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.service.create(createTaskDto);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put('status')
  async updateStatus(@Body() dto: UpdateTaskStatusDto) {
    await this.service.updateStatus(dto);
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
