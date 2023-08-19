/* eslint-disable prettier/prettier */

import {User} from '../entities/user.entity'

import {IsEmail, IsString, MinLength, MaxLength, Matches, IsBoolean} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto extends User {
  @ApiProperty({example: 'user@example.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: 'User001'})
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({example: 'João da Silva Sauros'})
  @IsString()
  name: string;

  @ApiProperty({example: '81 99999-9999'})
  @IsString()
  phone: string;

  @ApiProperty({example: 'true'})
  status: boolean;

  @ApiProperty({example: 10})
  points: number;
}
