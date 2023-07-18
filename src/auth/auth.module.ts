/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory:() => ({secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '6h'},
    }),
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtGuard, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}