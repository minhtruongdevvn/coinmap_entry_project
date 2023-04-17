import { User } from 'src/user/schemas/user.schema';

export class UserSummary {
  ownerId: User;
  totalPoint: number;
  completed: number;
}
