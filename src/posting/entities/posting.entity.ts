import { IsNotEmpty } from "class-validator";
import { Theme } from "src/theme/entities/theme.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'posting_tb'})
export class Posting {
    
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty ()
    @Column ({length: 100, nullable: false})
    title: string

    @IsNotEmpty ()
    @Column ({length: 1000, nullable: false})
    text: string;

    @UpdateDateColumn ()
    data: Date;

    @ManyToOne (() => Theme, (theme) => theme.posting,{
        onDelete: "CASCADE"
    })
    theme: Theme

    @ManyToOne (() => User, (user) => user.posting,{
        onDelete: "CASCADE"
    })
    user: User
}