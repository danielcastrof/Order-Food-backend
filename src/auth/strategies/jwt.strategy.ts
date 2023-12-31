/* eslint-disable prettier/prettier */
import { UserFromJwt } from './../models/user-from-jwt';
import { UserPayload } from './../models/user-payload';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    return { 
      id: payload.sub,
      email:payload.email,
      firstname:payload.name,
      role: payload.role,
     };
  }
}