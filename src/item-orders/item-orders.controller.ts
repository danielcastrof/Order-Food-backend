import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemOrdersService } from './item-orders.service';
import { CreateItemOrderDto } from './dto/create-item-order.dto';
import { UpdateItemOrderDto } from './dto/update-item-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Itens do pedido')
@Controller('item-orders')
export class ItemOrdersController {
  constructor(private readonly itemOrdersService: ItemOrdersService) {}

  @Post()
  create(@Body() createItemOrderDto: CreateItemOrderDto) {
    return this.itemOrdersService.addingItem(createItemOrderDto);
  }

  @Get()
  findAll() {
    return this.itemOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemOrdersService.findOne(id);
  }

  @Patch(':id')
  updateItem(@Param('id') id: number, @Body() updateItemOrderDto: UpdateItemOrderDto) {
    return this.itemOrdersService.updateItem(+id, updateItemOrderDto);
  }

  @Delete(':id')
  removeItem(@Param('id') id: number) {
    return this.itemOrdersService.removeItem(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemOrdersService.remove(id);
  }
}
