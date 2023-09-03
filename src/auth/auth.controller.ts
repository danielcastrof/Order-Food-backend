/* eslint-disable prettier/prettier */
import { LoginDto } from './dto/login.dto';
import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/auth-request';

@ApiTags('Autenticação')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest, @Body() loginDto: LoginDto){
        return this.authService.login(req.user);
    }
    
}
