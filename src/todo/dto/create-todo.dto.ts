import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/user/schemas/user.schema';
import { TodoStatus } from '../schemas/todo-status.enum';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  createdAt?: string;

  @IsDate()
  @IsOptional()
  updateAt?: Date;

  @IsNumber()
  @IsOptional()
  status?: TodoStatus;

  @IsNumber()
  point: number;

  @IsString()
  @IsNotEmpty()
  owner?: User | string;
}
