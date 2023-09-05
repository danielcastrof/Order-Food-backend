import { Test, TestingModule } from '@nestjs/testing';
import { ItemOrdersService } from './item-orders.service';

describe('ItemOrdersService', () => {
  let service: ItemOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemOrdersService],
    }).compile();

    service = module.get<ItemOrdersService>(ItemOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
