import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/user/schema/user.schema';

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
  point: number;

  @IsString()
  @IsNotEmpty()
  owner?: User | string;
}
