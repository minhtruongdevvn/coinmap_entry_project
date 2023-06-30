import { TaskStatus } from '@/common/database/schema';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsString()
  @IsNotEmpty()
  taskId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
