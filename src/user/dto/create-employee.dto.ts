import { Role } from '@prisma/client';
import {User} from '../entities/user.entity'
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateEnterpriseDto extends User {
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

  @ApiProperty({example: 'Casas Bahia'})
  @IsString()
  name: string;

  @ApiProperty({example: '27061850000156'})
  @IsString()
  cnpj: string;

  @ApiProperty({example: '(81) 98765-4321'})
  @IsString()
  phone: string;
}