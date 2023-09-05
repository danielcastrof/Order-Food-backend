/* eslint-disable prettier/prettier */
import {itens} from './items';
import {usuarios} from './users';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main(){
    for(const item of itens){
        // await prisma.item.create({
        //     //data: {...item, url: item.url},
        // })
    }

    for(let i = 0; i < 3; i++){
        const usuario = usuarios[i];
        const us = {
            ...usuario,
            password: await bcrypt.hash(usuario.password, 10),
          }
        
        if(i === 0){
        await prisma.user.create({
            data: {...us, role: 'ADMIN'},
        })
        }
        else if(i === 1){
        await prisma.user.create({
            data: {...us, role: 'EMPLOYEE'},
        })
        }
        if(i === 2){
        await prisma.user.create({
            data: {...us, role: 'USER'},
        })
        }
    }

    }

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})