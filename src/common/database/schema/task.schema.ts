import { User } from '@/common/database/schema/user.schema';
import { AppSchema } from '@/common/decorator/app-schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;
export enum TaskStatus {
  Assigned,
  Completed,
}

@AppSchema({
  collection: 'Task',
})
export class Task {
  @Prop({ required: true })
  title?: string;

  @Prop()
  description?: string;

  @Prop({ type: Date, default: new Date() })
  createdAt?: Date;

  @Prop({ type: Date, default: new Date() })
  updateAt?: Date;

  @Prop({ enum: TaskStatus, default: TaskStatus.Assigned })
  status?: TaskStatus;

  @Prop({ default: 0 })
  point?: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  owner?: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
