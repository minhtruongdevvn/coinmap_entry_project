import { Tokens } from '@/auth/type';
import { User } from '@/common/database/schema/user.schema';
import { Role } from '@/common/enum';

const registeredUser = (): User => {
  const now = new Date();

  return {
    createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    email: 'test@gmail.com',
    hash: 'asdasdasd',
    name: 'John Doe',
    role: Role.MANAGER,
  };
};

const tokens = (): Tokens => {
  return { access_token: 'asdasdasd', refresh_token: 'asdasdasd' };
};

export { registeredUser, tokens };
