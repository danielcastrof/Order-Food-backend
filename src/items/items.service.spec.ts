import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { PrismaService } from './../prisma/prisma.service';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService, PrismaService], // Certifique-se de fornecer PrismaService aqui
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an item', async () => {
    const newItem = {
      id: 'test_id',
      name: 'Test Item',
      description: 'Test Description',
      price: 10,
      quantity: 5,
      category: 'Test Category',
      url: 'https://example.com/test',
    };

    const createdItem = await service.create(newItem);
    expect(createdItem).toBeDefined();
    expect(createdItem.name).toBe(newItem.name);
  });

  it('should find all items', async () => {
    const items = await service.findAll();
    expect(items).toBeDefined();
  });

  it('should find items by name', async () => {
    const itemName = 'Test Item';
    const items = await service.findAllSearch(itemName);
    expect(items).toBeDefined();
  });

  it('should find one item by name', async () => {
    const itemName = 'Test Item';
    const item = await service.findOne(itemName);
    expect(item).toBeDefined();
  });

  it.skip('should update an item', async () => {
    const itemName = 'Test Item';
    const updatedItemData = {
      name: 'Updated Item Name',
      description: 'Updated Description',
      price: 15,
    };

    const updatedItem = await service.update(itemName, updatedItemData);
    expect(updatedItem).toBeDefined();
    expect(updatedItem.name).toBe(updatedItemData.name);
  });

  it.skip('should remove an item', async () => {
    const itemName = 'Test Item';
    const result = await service.remove(itemName);
    expect(result).toBe(`This action removes a #${itemName} item`);
  });
});
