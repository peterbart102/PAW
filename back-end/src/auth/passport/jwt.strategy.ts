import * as passport from 'passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Component} from '@nestjs/common';
import {AuthService} from '../auth.service';
import {ValidateUser} from '../auth.model';
import {UserEntity} from '../user.entity';

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true,
                secretOrKey: 'secret',
            },
            async (req, payload, next) => await this.verify(req, payload, next),
        );
        passport.use(this);
    }

    public async verify(req, payload: ValidateUser, done) {
        const userEntity: UserEntity | undefined = await AuthService.validateUser(payload);
        if (!userEntity) {
            return done('Unauthorized', false);
        }
        req.userEntity = userEntity;
        done(null, payload);
    }
}