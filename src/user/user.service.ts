/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/models/role.enum';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
const jwt = require('jsonwebtoken');

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

  async myUser (token: string) {
    try{
      const userId = jwt.verify(token, process.env.JWT_SECRET, function(err: any, decoded: any) {
          const userId = decoded.sub
          return userId
      });
      return await this.prisma.user.findUnique({where: {id: userId}, select:
        {id: true, name: true, email: true, role: true}
      })
    } catch (error) {
       console.log(error)
    }
  }

  async findByUserToken(headers: {}) {
    console.log(headers)
    if(headers["authorization"].includes('Bearer')) return await this.myUser(headers["authorization"].split("Bearer ")[1].trim())
    return await this.myUser(headers["authorization"].trim())
  }

}