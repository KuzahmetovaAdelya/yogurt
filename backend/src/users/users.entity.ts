import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column({ nullable: true })
    name: string;

    @Column()
    password: string;

    @Column()
    role: string;
}