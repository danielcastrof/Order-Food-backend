import { Test, TestingModule } from '@nestjs/testing';
import { ItemOrdersService } from './item-orders.service';
import { PrismaService } from './../prisma/prisma.service';
import { CreateItemOrderDto } from './dto/create-item-order.dto';

// Mock do PrismaService
const prismaServiceMock = {
  item: {
    findUnique: jest.fn(),
  },
  order: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  itemOrder: {
    create: jest.fn(),
  },
};

describe('ItemOrdersService', () => {
  let service: ItemOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemOrdersService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<ItemOrdersService>(ItemOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add an item to the order', async () => {
    // Mock dos dados
    const createItemOrderDto: CreateItemOrderDto = {
      itemId: 'item_id',
      orderId: 'order_id',
      quantity: 2,
      subtotal: 20,
    };

    const itemMock = {
      id: 'item_id',
      price: 10, 
    };

    const orderMock = {
      id: 'order_id',
      total: 20,
    };

    prismaServiceMock.item.findUnique.mockResolvedValue(itemMock);
    prismaServiceMock.order.findUnique.mockResolvedValue(orderMock);

    const result = await service.addingItem(createItemOrderDto);

    expect(result).toEqual(undefined);
  });

});
