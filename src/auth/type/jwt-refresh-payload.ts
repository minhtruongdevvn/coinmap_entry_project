import { JwtPayload } from './jwt-payload.type';

export type JwtRefreshPayload = { refreshToken: string } & JwtPayload;
