import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Item } from "../items/items.entity";

@Entity()
export class Basket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    itemId: number;

    @Column()
    count: number;

    @ManyToOne(() => Item)
    @JoinColumn({ name: 'itemId' })
    item: Item;
}