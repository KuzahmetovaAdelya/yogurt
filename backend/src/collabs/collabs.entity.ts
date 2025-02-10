import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Collab {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("simple-array")
    image: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    instagram: string;

    @Column()
    telegram: string;

    @Column()
    vkontakte: string;

    @Column()
    youtube: string;
}