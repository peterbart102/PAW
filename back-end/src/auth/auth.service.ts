import * as jwt from 'jsonwebtoken';
import {Component} from '@nestjs/common';
import {AuthenticateUserRequest, ValidateUser} from './auth.model';

import {Md5} from 'ts-md5/dist/md5';
import {UserEntity} from './user.entity';

@Component()
export class AuthService {
    async createToken(authenticateUserRequest: AuthenticateUserRequest) {
        return UserEntity.findOne({
                email: authenticateUserRequest.email,
                passwordHash: Md5.hashStr(authenticateUserRequest.password).toString()
            }
        ).then(user => {
            if (user) {
                const expiresIn = 60 * 60, secretOrKey = 'secret';
                const token = jwt.sign({email: user.email, group: 'user'}, secretOrKey, {expiresIn});
                return {
                    expires_in: expiresIn,
                    access_token: token,
                };
            } else {
                return {
                    failed: 'authorization_failed',
                };
            }
        });
    }

    async validateUser(signedUser: ValidateUser): Promise<boolean> {
        // TODO: put some validation logic here
        console.log('validateUser' + JSON.stringify(signedUser));
        return true;
    }
}