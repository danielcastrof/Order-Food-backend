/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateAdminDto extends User {
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