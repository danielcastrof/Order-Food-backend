import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { UserToken } from './models/user-token';
import { AuthRequest } from './models/auth-request';
import { HttpModule } from '@nestjs/axios';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AuthController],
      providers: [AuthService, UserService, LocalAuthGuard],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return a valid token when a valid username and password are provided', async () => {
      const mockLoginDto: LoginDto = {
        email: 'test@gmail.com',
        password: 'password',
      };

      const mockAuthRequest: AuthRequest = {
        user: {
          id: '1',
          email: 'test@test.com',
          firstname: 'test',
          cpf: '12345678910',
          adress: 'test adress',
          vagas: true,
          shared: true,
          published: true,
          password: 'password',
        }
      } as AuthRequest;

      jest
        .spyOn(authService, 'login')
        .mockImplementation(() => Promise.resolve({access_token: 'valid_token'}));

      const result = await authController.login(mockAuthRequest, mockLoginDto);

      expect(result).toEqual({access_token: 'valid_token'});
    });
  });
});