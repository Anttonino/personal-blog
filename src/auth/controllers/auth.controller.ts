import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { UserLogin } from "../entities/userlogin.entity";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { AuthService } from "../services/auth.service";

@Controller ("/auth")
export class AuthController {
    constructor (private authService: AuthService) { }

    @UseGuards (LocalAuthGuard)
    @HttpCode (HttpStatus.OK)
    @Post ('/login')
    async login (@Body () username: UserLogin): Promise <any> {
        return this.authService.login (username)
    }
}