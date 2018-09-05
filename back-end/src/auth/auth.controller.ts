import {Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, ValidationPipe,} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthenticateUserRequest} from './auth.model';
import {UserEntity} from './user.entity';
import {User} from './user.decorator';
import {BoardEntity} from '../board.entity';
import {ListEntity} from '../list.entity';

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

    @Get('board/:boardId')
    public async board(@User() user: UserEntity, @Param('boardId', new ParseIntPipe()) id: number) {
        console.log('Authorized route...');
        console.log(JSON.stringify(user));
        const promise: BoardEntity = await BoardEntity.findOne({
                relations: ['owner', 'lists', 'lists.cards'],
                where: {
                    owner: user
                }
            }
        );
        console.log(JSON.stringify(promise));
        // const value = promise.owner;
        // console.log(JSON.stringify(value));
        // const cardsEntities2 = await Promise.all(listEntities.map(e => e.cards));
        return JSON.stringify({
            listId: await promise.id,
            listName: await promise.title,
            tasksList: await promise.lists
        });
    }

    @Post('list/:listId')
    public async updateList(@User() user: UserEntity,
                            @Param('listId', new ParseIntPipe()) listId: number,
                            @Body() body: any) {
        console.log('Authorized route...');
        console.log(JSON.stringify(user));
        const newTitle = body.title;
        if (!newTitle || newTitle === '') {
            return 'not-ok';
        }
        console.log(body);
        console.log(newTitle);
        console.log('listId' + listId);
        const promise: ListEntity = await ListEntity.findOne({
                where: {
                    id: listId
                }
            }
        );
        promise.title = newTitle;

        console.log(JSON.stringify(promise));
        // const value = promise.owner;
        // console.log(JSON.stringify(value));
        // const cardsEntities2 = await Promise.all(listEntities.map(e => e.cards));
        return JSON.stringify(await promise.save());
    }
}