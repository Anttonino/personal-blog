import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Theme } from "../../theme/entities/theme.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'posting_tb'})
export class Posting {
    
    @ApiProperty ()  
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty ()  
    @IsNotEmpty ()
    @Column ({length: 100, nullable: false})
    title: string

    @ApiProperty ()  
    @IsNotEmpty ()
    @Column ({length: 1000, nullable: false})
    text: string;

    @ApiProperty ()  
    @UpdateDateColumn ()
    data: Date;

    @ApiProperty ({ type: () => Theme })  
    @ManyToOne (() => Theme, (theme) => theme.posting,{
        onDelete: "CASCADE"
    })
    theme: Theme

    @ApiProperty ({ type: () => Posting }) 
    @ManyToOne (() => User, (user) => user.posting,{
        onDelete: "CASCADE"
    })
    user: User
}