import {Controller, Get} from '@nestjs/common';
import {UserEntity} from './auth/user.entity';
import {CardEntity} from './card.entity';
import {ListEntity} from './list.entity';
import {BoardEntity} from './board.entity';

@Controller()
export class AppController {
    @Get()
    async root() {
        const userEntity = new UserEntity();
        const cardEntity = new CardEntity();
        const listEntity = new ListEntity();
        const boardEntity = new BoardEntity();

        userEntity.email = 'rafal@ot.com';
        // this is 123456 in md5
        userEntity.passwordHash = 'e10adc3949ba59abbe56e057f20f883e';

        cardEntity.title = 'This is a card';
        cardEntity.parentList = listEntity;

        listEntity.board = boardEntity;
        listEntity.cards = [cardEntity];
        listEntity.title = 'This is a list';

        boardEntity.owner = userEntity;
        boardEntity.title = 'This is a board';
        boardEntity.lists = [listEntity];

        await userEntity.save();
        await cardEntity.save();
        await listEntity.save();
        await boardEntity.save();

        return 'ok';
    }

    @Get('something')
    something(): string {
        return 'something xddd';
    }
}
