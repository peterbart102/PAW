import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BoardEntity} from './board.entity';
import {CardEntity} from './card.entity';

@Entity()
export class ListEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @ManyToOne(type => BoardEntity, board => board.lists)
    board: BoardEntity;
    @OneToMany(type => CardEntity, card => card.parentList)
    cards: CardEntity[];
}