import { TaskRepository } from '@/common/database/repository';
import { Task, TaskStatus } from '@/common/database/schema';
import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findById(id: string): Promise<Task> {
    return this.taskRepository.findOne({ id });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const res = await this.taskRepository.create({
      ...createTaskDto,
    });

    return await res.populate('owner', { hash: 0, hashRt: 0 });
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.findOneAndUpdate({ id }, updateTaskDto);
  }

  delete(id: string): Promise<void> {
    return this.taskRepository.findOneAndDelete({ id });
  }

  updateStatus(userId: string, taskId: string, status: TaskStatus) {
    return this.taskRepository.findOneAndUpdate(
      {
        owner: userId,
        _id: taskId,
      },
      {
        status,
      },
    );
  }
}
