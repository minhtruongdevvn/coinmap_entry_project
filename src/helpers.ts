import * as bcrypt from 'bcrypt';

const getHash = (str: string) => {
  return bcrypt.hash(str, 10);
};

const validateHash = (data: string, encrypted: string) => {
  return bcrypt.compare(data, encrypted);
};

export { getHash, validateHash };
