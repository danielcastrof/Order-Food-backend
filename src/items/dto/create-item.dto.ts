import {Item} from '../entities/item.entity'

import {IsEmail, IsString, MinLength, MaxLength, Matches, IsBoolean, IsNumber} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
export class CreateItemDto extends Item {

  @ApiProperty({example: 'Bolo'})
  @IsString()
  name: string;

  @ApiProperty({example: 7.99})
  @IsNumber()
  price: number;

  @ApiProperty({example: 'Bolo de chocolate'})
  @IsString()
  description: string;

  category: string;
  quantity: number;
  url: string;
}
