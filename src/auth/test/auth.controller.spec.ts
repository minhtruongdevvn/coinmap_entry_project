import { Role } from '@/common/enum';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { SignInDto } from '../dto';
import { JwtRefreshPayload } from '../type';
import { tokens as getToken } from './stub';

jest.mock('../auth.service'); // this line used to enable jest automatic

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    const dto: SignInDto = { email: 'test@e.com', password: 'pass123!' };

    it('should call AuthService.signIn', async () => {
      await controller.signIn(dto);
      expect(service.signIn).toBeCalledWith(dto);
    });

    it('should return token', async () => {
      const tokens = await controller.signIn(dto);
      expect(tokens).toEqual(getToken());
    });
  });

  describe('logout', () => {
    const id = 'id';
    beforeEach(async () => {
      await controller.logout(id);
    });

    it('should call AuthService.logout', async () => {
      expect(service.logout).toBeCalledWith(id);
    });
  });

  describe('refreshToken', () => {
    const dto: JwtRefreshPayload = {
      email: 'test@e.com',
      refreshToken: 'asdasd',
      role: Role.Manager,
      sub: 'id',
    };

    it('should call AuthService.refreshToken', async () => {
      await controller.refreshToken(dto);
      expect(service.refreshToken).toBeCalledWith(dto.sub, dto.refreshToken);
    });

    it('should return token', async () => {
      const tokens = await controller.refreshToken(dto);
      expect(tokens).toEqual(getToken());
    });
  });
});
// import { Role } from '@/common/enum';
// import { Test } from '@nestjs/testing';
// import { AuthController } from '../auth.controller';
// import { AuthService } from '../auth.service';
// import { SignInDto } from '../dto';
// import { JwtRefreshPayload, Tokens } from '../type';

// describe('AuthController', () => {
//   let authController: AuthController;
//   let authService: AuthService;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [
//         {
//           provide: AuthService,
//           useValue: {
//             signIn: jest.fn(),
//             logout: jest.fn(),
//             refreshToken: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     authController = moduleRef.get<AuthController>(AuthController);
//     authService = moduleRef.get<AuthService>(AuthService);
//   });

//   it('should sign in a user', async () => {
//     const dto: SignInDto = { email: 'test@example.com', password: 'password' };
//     const tokens: Tokens = {
//       access_token: 'access-token',
//       refresh_token: 'refresh-token',
//     };

//     jest.spyOn(authService, 'signIn').mockResolvedValueOnce(tokens);

//     expect(await authController.signIn(dto)).toEqual(tokens);
//   });

//   it('should logout a user', async () => {
//     const id = 'user-id';

//     jest.spyOn(authService, 'logout').mockResolvedValueOnce(undefined);

//     expect(await authController.logout(id)).toBeUndefined();
//   });

//   it('should refresh a token', async () => {
//     const user: JwtRefreshPayload = {
//       email: 'test@e.com',
//       refreshToken: 'asdasd',
//       role: Role.Manager,
//       sub: 'id',
//     };

//     const tokens: Tokens = {
//       access_token: 'access-token',
//       refresh_token: 'refresh-token',
//     };

//     jest.spyOn(authService, 'refreshToken').mockResolvedValueOnce(tokens);

//     expect(await authController.refreshToken(user)).toEqual(tokens);
//   });
// });
