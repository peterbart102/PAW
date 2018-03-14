import {Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, ValidationPipe,} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthenticateUserRequest} from './auth.model';
import {UserEntity} from './user.entity';
import {User} from './user.decorator';
import {BoardEntity} from '../board.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('token')
    @HttpCode(HttpStatus.OK)
    public async getToken(@Body(new ValidationPipe()) authenticateUserRequest: AuthenticateUserRequest) {
        console.log(authenticateUserRequest);
        return this.authService.createToken(authenticateUserRequest);
    }

    @Get('authorized/:id')
    public async authorized(@User() user: UserEntity, @Param('id', new ParseIntPipe()) id: number) {
        console.log('Authorized route...');
        console.log(JSON.stringify(user));
        const promise: BoardEntity = await  BoardEntity.findOne({
                relations: ['owner'],
                where: {
                    owner: user
                }
            }
        );
        console.log(JSON.stringify(promise));
        const value = promise.owner;
        console.log(JSON.stringify(value));
        return JSON.stringify({userId: String(id)});
    }
}