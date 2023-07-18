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
  
  @ApiProperty({example: '19909882712'})
  @IsString()
  cpf: string;

  @ApiProperty({example: 'Rua dos bobos, 0'})
  @IsString()
  address: string;

  @ApiProperty({example: '(81) 98765-4321'})
  @IsString()
  phone: string;

  @ApiProperty({example: '3fb2818b-bc43-4f34-ba31-8f96a5ab8372'})
  @IsString()
  courseId: string;

  @ApiProperty({example: true})
  @IsBoolean()
  status: boolean;
}
