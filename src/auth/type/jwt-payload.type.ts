import { Role } from 'src/common/enum/role.enum';

export type JwtPayload = {
  email: string;
  sub: string;
  role: Role;
};
