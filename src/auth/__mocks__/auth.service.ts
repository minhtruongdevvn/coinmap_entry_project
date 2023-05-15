import { tokens } from '../test/stub';

export const AuthService = jest.fn().mockReturnValue({
  signIn: jest.fn().mockResolvedValue(tokens()),
  logout: jest.fn(),
  refreshToken: jest.fn().mockResolvedValue(tokens()),
});
