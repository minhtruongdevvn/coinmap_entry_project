import { Role } from '@/common/enum/role.enum';

export type JwtPayload = {
  email: string;
  sub: string;
  role: Role;
  iat?: number;
  exp?: number;
};
