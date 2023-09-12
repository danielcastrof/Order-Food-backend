import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  let role: Role;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.skip('should create a user', async () => {
    const mockCreate = jest.fn();
    const createUserDto: CreateUserDto = {
       // id: 'user_id',
        name: 'Test User',
        email: 'test@example.com',
        password: 'undefined',
        phone: '',
        status: false,
        points: 0,
    };

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockUser = {
      id: 'user_id',
      name: createUserDto.name,
      email: createUserDto.email,
      password: 'undefined',
      role: createUserDto.role,
      phone: createUserDto.phone,
      status: createUserDto.status,
      points: createUserDto.points,
    };

    // Mock the behavior of PrismaService.user.create
    prismaService.user.create = mockCreate.mockResolvedValue(mockUser);

    // Call the create method of UserService
    const createdUser = await service.create(createUserDto);

    // Assertions
    expect(createdUser).toEqual({
      id: createUserDto.id,
      name: createUserDto.name,
      email: createUserDto.email,
      password: 'undefined',
      role: createUserDto.role,
      phone: createUserDto.phone,
      status: createUserDto.status,
      points: createUserDto.points,
    });
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        ...createdUser,
        password: hashedPassword, // Verify that the password is hashed
      },
    });
  });

  // Add more test cases for other methods as needed
});
