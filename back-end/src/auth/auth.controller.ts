import {Controller, Get, HttpCode, HttpStatus, Param, Post, Req} from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('token')
    @HttpCode(HttpStatus.OK)
    public async getToken() {
        return await this.authService.createToken();
    }

    @Get('authorized/:id')
    public async authorized(@Req() req, @Param('id') id: number) {
        console.log('Authorized route...');
        console.log(id + 5);
        return JSON.stringify({userId: String(id)});
    }
}