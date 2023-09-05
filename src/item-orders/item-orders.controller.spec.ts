import { Test, TestingModule } from '@nestjs/testing';
import { ItemOrdersController } from './item-orders.controller';
import { ItemOrdersService } from './item-orders.service';

describe('ItemOrdersController', () => {
  let controller: ItemOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemOrdersController],
      providers: [ItemOrdersService],
    }).compile();

    controller = module.get<ItemOrdersController>(ItemOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
