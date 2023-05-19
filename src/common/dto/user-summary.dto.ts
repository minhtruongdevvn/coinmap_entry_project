import { User } from '@/common/database/schema/user.schema';

export class UserSummary {
  ownerId: User;
  totalPoint: number;
  completed: number;
}
