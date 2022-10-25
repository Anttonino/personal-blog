import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from "@nestjs/common";

import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Controller ("/users")
export class UserController {
    constructor (private readonly userService: UserService) { }

    @Get ('/all')
    @HttpCode (HttpStatus.OK)
    findAll(): Promise <User []> {
        return this.userService.findAll();
    }

    @HttpCode (HttpStatus.CREATED)
    @Post ('/cadastrar')
    async create (@Body () user: User): Promise <User> {
        return await this.userService.create (user);
    }

    @Put ('/atualizar')
    @HttpCode (HttpStatus.OK)
    async update (@Body () user: User): Promise <User> {
        return this.userService.update(user);
    }

}