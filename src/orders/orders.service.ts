import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Item } from '@prisma/client';
import { UserService } from 'src/user/user.service';


@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService, private readonly userService: UserService){}
  async create(headers: {}, createOrderDto: CreateOrderDto) {
    const user = await this.userService.findByUserToken(headers);

    const order = {
      ...createOrderDto,
    }

    const createdItem = await this.prisma.order.create({data: {
        "total": 0,
        "qtd": order.qtd,
        "status": false,
        "finished": false,
        "authorId": user.id, 
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

  async findOneOrder(id: string) {
    const finds = await this.prisma.order.findUnique({
      where: {
       id: id
      }});
    return finds
  }

  async findAllOrdersUser(headers: {}) {
    const user = await this.userService.findByUserToken(headers);
    const id = user.id
    const finds = await this.prisma.order.findMany({where: {
      authorId: id
    }, include: { item: true }});
    console.log(finds)
    return finds;
  }

  async findOne(id: string) {
    const finds = await this.prisma.order.findUnique({
      where: {
       id: id
      }, include: { item: true }});
    return finds
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order_ = await this.findOne(id);
    const order = await this.prisma.order.update({
      where: {id: order_.id},
      data: {
        status: updateOrderDto.status === null ? order_.status : updateOrderDto.status,
        finished: updateOrderDto.finished === null ? order_.finished : updateOrderDto.finished
      }
    })
    return order;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
