import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

import { Theme } from "../entities/theme.entity";

@Injectable ()
export class ThemeService {
    constructor (@InjectRepository (Theme)
        private themeRepository: Repository <Theme>
    ) { }

    async findAll (): Promise <Theme []> {
        return await this.themeRepository.find ({
            relations: {posting: true}
        });
    }

    async findById (id: number): Promise <Theme> {
        let searchTheme = await this.themeRepository.findOne ({
            where: {id},
            relations: {posting: true}
        });

        if (!searchTheme)
            throw new HttpException ('Theme not found!', HttpStatus.NOT_FOUND)
        return searchTheme
    }

    async findByDescription (description: string): Promise <Theme []> {
        return await this.themeRepository.find ({
            where: {description: ILike (`%${description}%`)},
            relations: {posting: true}
        })
    }

    async create (theme: Theme): Promise <Theme> {
        return await this.themeRepository.save (theme);
    }

    async update (theme: Theme): Promise <Theme> {
        let searchTheme: Theme = await this.findById (theme.id);

        if (!searchTheme || !theme.id)
            throw new HttpException ('Theme not found!', HttpStatus.NOT_FOUND);
        return await this.themeRepository.save (theme);
    }

    async delete (id: number): Promise <DeleteResult> {
        let searchTheme = await this.findById (id);

        if (!searchTheme)
            throw new HttpException ('Theme not found!', HttpStatus.NOT_FOUND)

        return await this.themeRepository.delete (id);
    }
}