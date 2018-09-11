import {Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, ValidationPipe,} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthenticateUserRequest} from './auth.model';
import {UserEntity} from './user.entity';
import {User} from './user.decorator';
import {BoardEntity} from '../board.entity';
import {ListEntity} from '../list.entity';
import {CardEntity} from '../card.entity';

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

    @Post('board/:boardId/addList')
    public async newList(
        @User() user: UserEntity,
        @Param('boardId', new ParseIntPipe()) boardId: number,
        @Body() body: any
    ) {
        console.log('Authorized route...');
        console.log(JSON.stringify(user));
        const boardEntity: BoardEntity = await BoardEntity.findOne({
                where: {
                    id: boardId
                }
            }
        );
        if (boardEntity) {
            const newListEntity = new ListEntity();
            newListEntity.title = body.title;
            newListEntity.board = boardEntity;
            return JSON.stringify(await newListEntity.save());
        } else {
            return 'not-ok';
        }
    }

    @Post('list/:listId')
    public async updateList(@User() user: UserEntity,
                            @Param('listId', new ParseIntPipe()) listId: number,
                            @Body() body: any) {
        const newTitle = body.title;
        if (!newTitle || newTitle === '') {
            return 'not-ok';
        }
        const promise: ListEntity = await ListEntity.findOne({
                where: {
                    id: listId
                }
            }
        );
        promise.title = newTitle;
        return JSON.stringify(await promise.save());
    }

    @Post('list/:listId/newCard')
    public async addCard(@User() user: UserEntity,
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

        const newCard = new CardEntity();
        newCard.title = newTitle;
        newCard.parentList = promise;
        return JSON.stringify(await newCard.save());
    }

    @Post('list/:listId/moveCard/:cardId')
    public async moveCard(@User() user: UserEntity,
                          @Param('listId', new ParseIntPipe()) listId: number,
                          @Param('cardId', new ParseIntPipe()) cardId: number,
    ) {
        const newListEntity: ListEntity = await ListEntity.findOne({
                where: {
                    id: listId
                }
            }
        );

        const cardEntity = await CardEntity.findOne({
            where: {
                id: cardId
            }
        });
        cardEntity.parentList = newListEntity;
        return JSON.stringify(await cardEntity.save());
    }
}