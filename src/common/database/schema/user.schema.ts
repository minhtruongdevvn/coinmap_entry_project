import { AppSchema, Projection } from '@/common/decorator';
import { Role } from '@/common/enum/role.enum';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
const projection: Projection<User> = (doc, ret) => {
  delete ret.hash;
  delete ret.hashRt;
  return ret;
};

@AppSchema(
  {
    collection: 'User',
    // versionKey: false
  },
  projection,
)
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
  hash?: string;

  @Prop({ default: null })
  hashRt?: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
