import {MiddlewaresConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from './auth/auth.module';
import * as passport from 'passport';

@Module({
    imports: [AuthModule],
    controllers: [AppController],
    components: [],
})

export class ApplicationModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes({path: '/something', method: RequestMethod.ALL});
    }
}