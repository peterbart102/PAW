import {BaseEntity, Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class UserModel extends BaseEntity {
    @PrimaryColumn()
    email: string;
    @Column()
    passwordHash: string;
}