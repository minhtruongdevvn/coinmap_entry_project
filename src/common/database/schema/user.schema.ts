import { AppSchema } from '@/common/decorator/app-schema.decorator';
import { Role } from '@/common/enum/role.enum';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@AppSchema({
  collection: 'User',
  // versionKey: false
})
export class User {
  @Prop({ required: true })
  name?: string;

  @Prop({ enum: Role, default: Role.EMPLOYEE })
  role?: Role;

  @Prop({ type: Date, default: new Date() })
  createdAt?: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt?: Date;

  @Prop({ required: true, unique: true })
  email?: string;

  @Prop({ required: true })
  @Exclude({ toPlainOnly: true })
  hash?: string;

  @Exclude({ toPlainOnly: true })
  @Prop({ default: null })
  hashRt?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
