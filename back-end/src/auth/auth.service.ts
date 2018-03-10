import * as jwt from 'jsonwebtoken';
import {Component} from '@nestjs/common';
import {ValidateUser} from './auth.model';

@Component()
export class AuthService {
    async createToken() {
        const expiresIn = 60 * 60,
            secretOrKey = 'secret';
        const user = {email: 'thisis@example.com'};
        const token = jwt.sign(user, secretOrKey, {expiresIn});
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    async validateUser(signedUser: ValidateUser): Promise<boolean> {
        // TODO: put some validation logic here
        console.log('validateUser' + JSON.stringify(signedUser));
        return true;
    }
}