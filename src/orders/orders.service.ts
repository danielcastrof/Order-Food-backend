import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Item } from '@prisma/client';


@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService){}
  async create(createOrderDto: CreateOrderDto) {
    const order = {
      ...createOrderDto,
    }

    const createdItem = await this.prisma.order.create({data: {
        "total": 0,
        "qtd": 0,
        "status": false,
        "finished": false,
        "authorId": "7cedd9d4-21e6-4417-b583-f28c87d728bd", 
        "obs": order.obs
      }
    });
    
    return {
      ...createdItem
    }
  }

  async addingItemsOrder(item: Item, orderId: string){
    const order = await this.prisma.order.findUnique({where: {id: orderId}})
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string) {
    const finds = await this.prisma.order.findUnique({
      where: {
       id: id
      }});
    return finds
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
