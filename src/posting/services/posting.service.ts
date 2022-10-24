import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";

import { Posting } from "../entities/posting.entity";

@Injectable ()
export class PostingService {
    constructor (@InjectRepository (Posting)
        private postingRepository: Repository <Posting>
    ) { }

    async findAll (): Promise <Posting []> {
        return await this.postingRepository.find ({});
    }

    async findById (id: number): Promise <Posting> {
        let searchPosting = await this.postingRepository.findOne ({
            where: {id}
        });

        if (!searchPosting)
            throw new HttpException('Post not found!', HttpStatus.NOT_FOUND)
        return searchPosting
    }

    async findByTitulo(title: String): Promise<Posting []> {
        return await this.postingRepository.find ({
            where: {title: ILike (`%${title}%`)}
        })
    }

    async create (posting: Posting): Promise <Posting> {
        return await this.postingRepository.save (posting);
    }

    async update (posting: Posting): Promise <Posting> {
        let searchPosting: Posting = await this.findById (posting.id);

        if (!searchPosting || !posting.id)
            throw new HttpException ('Post not found!', HttpStatus.NOT_FOUND);
        return await this.postingRepository.save (posting);
    }

    async delete (id: number): Promise <DeleteResult> {
        let searchPosting = await this.findById (id);

        if (!searchPosting)
            throw new HttpException('Post not found!', HttpStatus.NOT_FOUND)

        return await this.postingRepository.delete(id);
    }
}