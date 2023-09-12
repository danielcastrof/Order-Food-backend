import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Mock do UserService
const userServiceMock = {
  findByEmails: jest.fn(),
};

// Mock do JwtService
const jwtServiceMock = {
  verifyAsync: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a user when email and password are valid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10), // Hash da senha correta
      };

      userServiceMock.findByEmails.mockResolvedValue(mockUser);
      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toEqual(expect.objectContaining({ id: 1, email: 'test@example.com' }));
      expect(result.password).toBeUndefined();
    });

    it('should throw an error when email or password is incorrect', async () => {
      userServiceMock.findByEmails.mockResolvedValue(null);

      await expect(service.validateUser('test@example.com', 'password')).rejects.toThrowError(
        'Email adress or password provided is incorrect',
      );
    });
  });

  describe('validateToken', () => {
    it('should return a user without password when token is valid', async () => {
      const mockToken = 'valid_token';
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10), // Hash da senha correta
      };

      jwtServiceMock.verifyAsync.mockResolvedValue(mockUser);
      const result = await service.validateToken(mockToken);

      expect(result).toEqual(expect.objectContaining({ id: 1, email: 'test@example.com' }));
      expect(result.password).toBeUndefined();
    });

    it('should throw an error when token is invalid', async () => {
      const invalidToken = 'invalid_token';

      jwtServiceMock.verifyAsync.mockRejectedValue(new Error('Invalid token'));

      await expect(service.validateToken(invalidToken)).rejects.toThrowError('Invalid token');
    });
  });
});
