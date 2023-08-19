import {Order} from '../entities/order.entity'

import {IsEmail, IsString, MinLength, MaxLength, Matches, IsBoolean, IsNumber} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../../items/entities/item.entity';
export class CreateOrderDto extends Order {

  @ApiProperty({example: 88.55})
  @IsString()
  total: number;

  @ApiProperty({example: 7.99})
  @IsNumber()
  price: number;

  @ApiProperty({example: 7})
  @IsNumber()
  qtd: number;

  @ApiProperty({example: 'Bolo de chocolate'})
  @IsString()
  finished: boolean;
  
  @ApiProperty({example: 'Bolo de chocolate'})
  @IsString()
  status: boolean;

  @ApiProperty({example: 'asd-asd65-ads6d56ad5-asdasd4'})
  @IsString()
  authorId: string;
  
  @ApiProperty()
  items: Item[];
}
