import { Schema } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';

export type Projection<T> = (doc: Document<T>, ret: T) => any;

export const AppSchema = <T>(
  options?: SchemaOptions,
  projection?: Projection<T>,
): ClassDecorator => {
  return Schema({
    toObject: {
      virtuals: true,
      transform: (doc: Document<T>, ret: T) => {
        const data = projection(doc, ret);
        delete data._id;
        return data;
      },
    },
    ...options,
  });
};
