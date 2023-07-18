/* eslint-disable prettier/prettier */
import { UserToken } from './models/user-token';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/user-payload';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService){}
    
    async login(user: User): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
        
        return{
            access_token: this.jwtService.sign(payload),
        }
    }
    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmails(email);

        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(isPasswordValid){
                return {
                  ...user,
                  password: undefined
                };
            }
        }
        throw new Error('Email adress or password provided is incorrect')
    }

    async validateToken(jwt: string){
        const user = await this.jwtService.verifyAsync(jwt);
        return {
            ...user,
            password: undefined,
          };
    }
}
