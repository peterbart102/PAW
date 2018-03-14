import {BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BoardEntity} from '../board.entity';

@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    email: string;
    @Column()
    passwordHash: string;
    @OneToMany(type => BoardEntity, boardEntity => boardEntity.owner)
    boards: BoardEntity[];
}