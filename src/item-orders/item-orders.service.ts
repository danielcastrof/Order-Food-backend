import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateItemOrderDto } from './dto/create-item-order.dto';
import { UpdateItemOrderDto } from './dto/update-item-order.dto';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';

@Injectable()
export class ItemOrdersService {
  constructor(private readonly prisma: PrismaService){}

  async addingItem(createItemOrderDto: CreateItemOrderDto) {
    const item = await this.prisma.item.findUnique({where: {id: createItemOrderDto.itemId}})
    const sub = item.price * createItemOrderDto.quantity;
    const order = await this.prisma.order.findUnique({where: {id: createItemOrderDto.orderId}})
    const attPedido = {
      ...order,
      total: order.total + sub,
    }
    this.update(order.id, attPedido);

    const data = {
      ...createItemOrderDto, subtotal: sub,
    }
    const created = await this.prisma.itemOrder.create({
      data: {
        "orderId": order.id,
        "itemId": item.id,
        "quantity": createItemOrderDto.quantity,
        "subtotal": sub,
      }
    })
    return created;
  }

  // async removeItem(createItemOrderDto: CreateItemOrderDto) {
  //   const item = await this.prisma.item.findUnique({where: {id: createItemOrderDto.itemId}})
  //   const sub = item.price * createItemOrderDto.quantity;
  //   const order = await this.prisma.order.findUnique({where: {id: createItemOrderDto.orderId}})
  //   const attPedido = {
  //     ...order,
  //     total: order.total - sub,
  //   }
  //   this.remove(order.id, attPedido);

  //   const data = {
  //     ...createItemOrderDto, subtotal: sub,
  //   }
  //   const created = await this.prisma.itemOrder.create({
  //     data: {
  //       "orderId": order.id,
  //       "itemId": item.id,
  //       "quantity": createItemOrderDto.quantity,
  //       "subtotal": sub,
  //     }
  //   })
  //   return created;
  // }

  findAll() {
    return `This action returns all itemOrders`;
  }

  async findOne(id: string) {
    const finds = await this.prisma.order.findUnique({where: {id}});
    
    return finds;
  }

  async update(id: string, updateItemOrderDto: UpdateItemOrderDto) {
    const order = await this.prisma.order.findUnique({where: {id}});
    const attPedido = await this.prisma.order.update({
      where: {id: order.id},
      data: {...updateItemOrderDto}
    })
    return attPedido;
  }

  async updateItem(id: number, updateItemOrderDto: UpdateItemOrderDto) {
    let itemOrder_ = await this.prisma.itemOrder.findUnique({where: {id}})
    itemOrder_.quantity = updateItemOrderDto.quantity

    const order_ = await this.findOne(itemOrder_.orderId);
    const item = await this.prisma.item.findUnique({where: {id: itemOrder_.itemId}})
    const sub = item.price * itemOrder_.quantity;

    const attPedido = {
      ...order_,
      total: order_.total + sub - itemOrder_.subtotal,
    }

    itemOrder_.subtotal = sub
    const itemOrderTemp = await this.prisma.itemOrder.update({
      where: {
        id: itemOrder_.id
      },
      data:{
        ...itemOrder_
      }
    })

    this.update(order_.id, attPedido);
    return {...attPedido, ...itemOrderTemp}
  }

  async removeItem(id: number) {
    const itemOrder_ = await this.prisma.itemOrder.findUnique({where: {id}})
    const order_ = await this.findOne(itemOrder_.orderId);
    const item = await this.prisma.item.findUnique({where: {id: itemOrder_.itemId}})
    const sub = item.price * itemOrder_.quantity;

    const attPedido = {
      ...order_,
      total: order_.total - sub,
    }

    this.update(order_.id, attPedido);

    await this.prisma.itemOrder.delete({
      where: {
        id: itemOrder_.id,
      }
    })
    
    return `O item: ${itemOrder_.id} foi removido do pedido ${order_.id} !`;
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    const user = await this.prisma.user.findUnique({where: {id: order.authorId}})

    await this.prisma.order.delete({
      where: {
        id: order.id,
      }
    })
    
    return `O pedido: ${order.id} do usuário ${user.name} foi removido do sistema!`;
  }
}
