import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';


@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService){}
  async create(createOrderDto: CreateOrderDto) {

    // let total = 0;
    // for (let index = 0; index < createOrderDto.length; index++) {
    //   const el = createOrderDto[index];
      
    //   const item = await this.prisma.item.findUnique({where: {id: el.itemId}})
    //   const order = await this.prisma.order.findUnique({where: {id: el.pedidoId}})



    // }

    

    // const createdItem = await this.prisma.order.create({data: {
    //     "name" : item.name, 
    //     "total": item.description,
    //     "price": item.price
    //   }
    // });
    
    // return {
    //   ...createdItem
    // }
  }

  async addingItemsOrder(item: Item, orderId: string){
    const order = await this.findOne(orderId)
    //order. = 'asdasd'
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string) {
    const finds = await this.prisma.order.findUnique({
      where: {
       id: id
      }});
    finds.
    return finds
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
