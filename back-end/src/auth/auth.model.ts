import {IsString} from 'class-validator';

export class ValidateUser {
    email: string;
    iat: number;
    exp: number;
}

export class AuthenticateUserRequest {
    @IsString()
    email: string;
    @IsString()
    password: string;
}

export class UserModel {
    email: string;
    passwordHash: string;
}