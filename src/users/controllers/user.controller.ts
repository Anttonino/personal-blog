import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Controller ("/users")
export class UserController {
    constructor (private readonly userService: UserService) { }

    @UseGuards (JwtAuthGuard)
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

    @UseGuards (JwtAuthGuard)
    @Put ('/atualizar')
    @HttpCode (HttpStatus.OK)
    async update (@Body () user: User): Promise <User> {
        return this.userService.update(user);
    }

}