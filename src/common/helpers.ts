import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';

class EntityId extends mongoose.Types.ObjectId {}

const getHash = (str: string) => {
  return bcrypt.hash(str, 10);
};

const validateHash = (data: string, encrypted: string) => {
  return bcrypt.compare(data, encrypted);
};

export { getHash, validateHash, EntityId };
