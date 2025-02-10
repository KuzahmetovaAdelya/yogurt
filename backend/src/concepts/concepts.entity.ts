import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Concept {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("simple-array")
    image: string;

    @Column()
    name: string;

    @Column()
    price: number;
}