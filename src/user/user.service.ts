/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/models/role.enum';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    }

    const createdUser = await this.prisma.user.create(
      {
        data: {...user, role: Role.USER},
      }
      );
    
    return {
      ...createdUser,
      id: undefined,
      password: undefined,
      role: undefined,
    };
  }

  async updateAdm(email: string, updateAdminDto: UpdateAdminDto) {
    const user = await this.findByEmails(email)
    
    const attUser = await this.prisma.user.update({
      where: {id: user.id},
      data: updateAdminDto,
    })
    return attUser;
  }

  async findByEmail(email: string) {
    const finds = await this.prisma.user.findUnique({
      where: {
       email
    },
    select: {
      email:true,
      name: true,
    }
    });
    
    return {
      ...finds,
    };
  }

  async findByEmails(email: string) {
    const finds = await this.prisma.user.findUnique({where: {email}});
    
    return finds;
  }

}