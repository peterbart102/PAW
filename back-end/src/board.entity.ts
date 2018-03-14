import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './auth/user.entity';
import {ListEntity} from './list.entity';

@Entity()
export class BoardEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @ManyToOne(type => UserEntity, userEntity => userEntity.boards)
    owner: UserEntity;
    @OneToMany(type => ListEntity, list => list.board)
    lists: ListEntity[];
}