import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Concept {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    name: string;

    @Column()
    price: number;
}