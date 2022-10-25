import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor (@InjectRepository (User)
        private userRepository: Repository<User>,
        private bcrypt: Bcrypt
    ) { }

    async findByUser (username: string): Promise <User | undefined> {
        return await this.userRepository.findOne ({
            where: {username: username}
        })
    }

    async findAll (): Promise <User []> {
        return await this.userRepository.find ({
            relations: {posting: true}
        });
    }

    async findById (id: number): Promise <User> {
        let searchUser = await this.userRepository.findOne ({
            where: {id},
            relations: {posting: true}
        });

        if (!searchUser)
            throw new HttpException ('user not found!', HttpStatus.NOT_FOUND);

        return searchUser;
    }

    async create (username: User): Promise <User> {
        
        let searchUser = await this.findByUser (username.username);

        if (!searchUser) {
            username.password = await this.bcrypt.encryptPassword (username.password)
            return await this.userRepository.save (username);
        }

        throw new HttpException ("O user ja existe!", HttpStatus.BAD_REQUEST);

    }

    async update (username: User): Promise <User> {

        let updateuser: User = await this.findById (username.id);
        let buscauser = await this.findByUser (username.username);

        if (!updateuser)
            throw new HttpException ('User not found!', HttpStatus.NOT_FOUND);

        if (buscauser && buscauser.id !== username.id)
            throw new HttpException ('User (e-mail) already registered!', HttpStatus.BAD_REQUEST);

        username.password = await this.bcrypt.encryptPassword (username.password)
        return await this.userRepository.save (username);
    }

}