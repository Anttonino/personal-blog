import { IsNotEmpty } from "class-validator"
import { Posting } from "src/posting/entities/posting.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity ({name: "theme_tb"})
export class Theme {

    @PrimaryGeneratedColumn ()    
    id: number

    @IsNotEmpty ()
    @Column ({length: 300, nullable: false})
    description: string

    @OneToMany (() => Posting, (posting) => posting.theme)
    posting: Posting []
    
}