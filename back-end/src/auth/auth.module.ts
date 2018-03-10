import * as passport from 'passport';
import {MiddlewaresConsumer, Module, NestModule, RequestMethod,} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtStrategy} from './passport/jwt.strategy';
import {AuthController} from './auth.controller';

@Module({
    components: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes({path: '/auth/authorized', method: RequestMethod.ALL});
    }
}