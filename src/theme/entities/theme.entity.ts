import { IsNotEmpty } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity ({name: "theme_tb"})
export class Theme {

    @PrimaryGeneratedColumn ()    
    id: number

    @IsNotEmpty ()
    @Column ({length: 300, nullable: false})
    description: string
}