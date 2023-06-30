import { User } from '@/common/database/schema/user.schema';
import { AppSchema } from '@/common/decorator/app-schema.decorator';
import { EntityId } from '@/common/helpers';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;
export enum TaskStatus {
  Assigned,
  Completed,
}

@AppSchema<Task>({
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
    type: EntityId,
    ref: User.name,
    required: true,
  })
  owner?: User | EntityId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
