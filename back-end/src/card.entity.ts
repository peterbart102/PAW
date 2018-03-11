import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ListEntity} from './list.entity';

@Entity()
export class CardEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @ManyToOne(type => ListEntity, list => list.cards)
    parentList: ListEntity;
}