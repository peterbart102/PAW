import {BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './auth/user.entity';
import {ListEntity} from './list.entity';

@Entity()
export class BoardEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @OneToOne(type => UserEntity)
    @JoinColumn()
    owner: UserEntity;
    @OneToMany(type => ListEntity, list => list.board)
    lists: ListEntity[];
}