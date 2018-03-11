import {Controller, Get} from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    root(): string {
        return 'Hello WorldXDDDD!';
    }

    @Get('something')
    something(): string {
        return 'something xddd';
    }
}
