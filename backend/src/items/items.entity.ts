import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("simple-array")
    image: string[];

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    discount: number;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column()
    material: string;
}
