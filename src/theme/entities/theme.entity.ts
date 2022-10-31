import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Posting } from "../../posting/entities/posting.entity"

@Entity ({name: "theme_tb"})
export class Theme {

    @PrimaryGeneratedColumn ()
    @ApiProperty ()    
    id: number

    @IsNotEmpty ()
    @Column ({length: 300, nullable: false})
    @ApiProperty ()
    description: string

    @ApiProperty() 
    @OneToMany (() => Posting, (posting) => posting.theme)
    posting: Posting []
    
}