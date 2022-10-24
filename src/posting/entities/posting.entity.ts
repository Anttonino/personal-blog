import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'posting_tb'})
export class Posting {
    
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty ()
    @Column ({length: 100, nullable: false})
    titulo: string

    @IsNotEmpty ()
    @Column ({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn ()
    data: Date;
}