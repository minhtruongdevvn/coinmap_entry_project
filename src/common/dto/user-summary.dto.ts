import { User } from 'src/user/schema/user.schema';

export class UserSummary {
  ownerId: User;
  totalPoint: number;
  completed: number;
}
