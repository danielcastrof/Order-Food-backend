import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from './../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from 'src/user/user.service';

const mockPrismaService = {
  order: {
    create: jest.fn(),
  },
};

const mockUserService = {
  findByUserToken: jest.fn(),
};

describe('OrdersService', () => {
  let service: OrdersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        PrismaService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.skip('should create an order', async () => {
    const user = { id: 'user_id' };
    mockUserService.findByUserToken.mockResolvedValue(user);

    const createOrderDto: CreateOrderDto = {
      qtd: 2,
      obs: 'Test Order',
      total: 0,
      status: false,
      finished: false,
      authorId: user.id,
      items: [],
      price: 0,
      name: '',
      author: '',
    };

    const mockOrder = {
      id: 'order_id',
      total: 0,
      qtd: createOrderDto.qtd,
      status: false,
      finished: false,
      authorId: user.id,
      obs: createOrderDto.obs,
    };

    // Mock the behavior of PrismaService.order.create
    mockPrismaService.order.create.mockResolvedValue(mockOrder);

    const expectedOrder = {
      id: 'order_id',
      total: 0,
      qtd: createOrderDto.qtd,
      status: false,
      finished: false,
      authorId: user.id,
      obs: createOrderDto.obs,
    };

    const createdOrder = await service.create({}, createOrderDto);

    expect(createdOrder).toEqual(expectedOrder);
    expect(mockPrismaService.order.create).toHaveBeenCalledWith({
      data: {
        total: 0,
        qtd: createOrderDto.qtd,
        status: false,
        finished: false,
        authorId: user.id,
        obs: createOrderDto.obs,
      },
    });
  });
});
