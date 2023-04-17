import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { TodoStatus } from './todo-status.enum';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ collection: 'Todo' })
export class Todo {
  @Prop({ required: true })
  title?: string;

  @Prop()
  description?: string;

  @Prop({ type: Date, default: new Date() })
  createdAt?: Date;

  @Prop({ type: Date, default: new Date() })
  updateAt?: Date;

  @Prop({ enum: TodoStatus, default: TodoStatus.Assigned })
  status?: TodoStatus;

  @Prop({ default: 0 })
  point?: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  owner?: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
