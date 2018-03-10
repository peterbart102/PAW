import * as jwt from 'jsonwebtoken';
import {Component} from '@nestjs/common';
import {AuthenticateUserRequest, UserModel, ValidateUser} from './auth.model';

import {Md5} from 'ts-md5/dist/md5';

@Component()
export class AuthService {
    async createToken(authenticateUserRequest: AuthenticateUserRequest) {
        const users: UserModel[] = [
            {
                email: 'thisis@example.com',
                // password: 123456
                passwordHash: 'e10adc3949ba59abbe56e057f20f883e',
            },
        ];
        const foundUser: UserModel | undefined = users.find(user =>
            user.email === authenticateUserRequest.email
            && user.passwordHash === Md5.hashStr(authenticateUserRequest.password));
        if (foundUser) {
            const expiresIn = 60 * 60, secretOrKey = 'secret';
            const token = jwt.sign({email: foundUser.email}, secretOrKey, {expiresIn});
            return {
                expires_in: expiresIn,
                access_token: token,
            };
        } else {
            return {
                failed: 'authorization_failed',
            };
        }
    }

    async validateUser(signedUser: ValidateUser): Promise<boolean> {
        // TODO: put some validation logic here
        console.log('validateUser' + JSON.stringify(signedUser));
        return true;
    }
}