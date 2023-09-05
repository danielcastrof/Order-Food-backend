import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService){}

  async create(createItemDto: CreateItemDto) {
    const item = {
      ...createItemDto,
    }

    const createdItem = await this.prisma.item.create({data: {
        "name" : item.name, 
        "description": item.description,
        "price": item.price,
        "quantity": item.quantity,
        "category": item.category,
        "url": item.url
      }
    });
    
    return {
      ...createdItem
    }
  }
  
  async findAll() {
    const finds = await this.prisma.item.findMany({
      take: 2
    })
    return finds;
  }

  async findAllSearch(name: string) {
    const finds = await this.prisma.item.findMany({
      where: {
       name: {contains: name, mode: 'insensitive'}
      }, orderBy: {name: 'asc'}});

    const finds_map = finds.map((el) => {
      return{
        "name": el.name,
        "description": el.description,
        "price": el.price
      }
    })
    return finds_map;
  }

  async findOne(name: string) {
    const finds = await this.prisma.item.findMany({
      where: {
       name: {contains: name, mode: 'insensitive'}
      }, orderBy: {name: 'asc'}});
    
    return finds.shift()
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.prisma.item.findUnique({
      where: {
        id: id
      }
    })
    
    const attItem = await this.prisma.item.update({
      where: {id: item.id},
      data: {
        "name" : updateItemDto.name, 
        "description": updateItemDto.description,
        "price": updateItemDto.price
      }
    })
    return attItem;
  }

  async remove(id: string) {
    const item = await this.prisma.item.findUnique({
      where: {
        id: id
      }
    })
    await this.prisma.item.delete({
      where: {
        id: item.id
      }
    })
    return `This action removes a #${id} item`;
  }
}
