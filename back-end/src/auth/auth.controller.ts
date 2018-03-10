import {
    Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req,
    ValidationPipe
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthenticateUserRequest} from './auth.model';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('token')
    @HttpCode(HttpStatus.OK)
    public async getToken(@Body(new ValidationPipe()) body: AuthenticateUserRequest) {
        console.log(body);
        return this.authService.createToken();
    }

    @Get('authorized/:id')
    public async authorized(@Req() req, @Param('id', new ParseIntPipe()) id: number) {
        console.log('Authorized route...');
        console.log(id + 5);
        return JSON.stringify({userId: String(id)});
    }
}