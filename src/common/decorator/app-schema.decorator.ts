import { Schema } from '@nestjs/mongoose';
import { SchemaOptions } from 'mongoose';

export const AppSchema = (options?: SchemaOptions): ClassDecorator => {
  return Schema({
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    ...options,
  });
};
