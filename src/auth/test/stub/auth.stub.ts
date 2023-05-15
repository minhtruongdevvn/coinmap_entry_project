import { Tokens } from '@/auth/type';
import { Role } from '@/common/enum';
import { User } from '@/user/schema/user.schema';

const registeredUser = (): User => {
  const now = new Date();

  return {
    createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    email: 'test@gmail.com',
    hash: 'asdasdasd',
    name: 'John Doe',
    role: Role.Manager,
  };
};

const tokens = (): Tokens => {
  return { access_token: 'asdasdasd', refresh_token: 'asdasdasd' };
};

export { registeredUser, tokens };
