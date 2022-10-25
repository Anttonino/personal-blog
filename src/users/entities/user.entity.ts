import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Posting } from "src/posting/entities/posting.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "users_tb"})
export class User {

    @PrimaryGeneratedColumn() 
    public id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    public name: string

    @IsEmail()
    @Column({length: 255, nullable: false })
    public username: string

    @IsNotEmpty()
    @MinLength(8)
    @Column({length: 255, nullable: false }) 
    public password: string

    @Column({length: 5000 }) 
    public foto: string

    @OneToMany(() => Posting, (posting) => posting.user)
    posting: Posting []
}