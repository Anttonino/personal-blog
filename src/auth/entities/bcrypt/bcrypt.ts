import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable ()
export class Bcrypt {

    async encryptPassword (password: string): Promise <string>{
        let jumps: number = 10
        return await bcrypt.hash (password, jumps);
    }

    async comparePassword (passwordBank: string, typedPassword: string): Promise <boolean>{
        return bcrypt.compareSync (typedPassword, passwordBank);
    }
}