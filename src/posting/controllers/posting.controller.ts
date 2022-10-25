import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";

import { Posting } from "../entities/posting.entity";
import { PostingService } from "../services/posting.service";

@Controller ("/posting")
export class PostingController {
    constructor (private readonly postingService: PostingService) { }

    @Get ()
    @HttpCode (HttpStatus.OK)
    findAll(): Promise <Posting []> {
        return this.postingService.findAll();
    }

    @Get ('/:id')
    @HttpCode (HttpStatus.OK)
    findById (@Param ('id', ParseIntPipe) id: number): Promise <Posting> {
        return this.postingService.findById (id);
    }

    @Get ('text/:text')
    @HttpCode (HttpStatus.OK)
    findByProName (@Param ('text') text: string): Promise <Posting []> {
        return this.postingService.findByTitle (text);
    }

    @Post ()
    @HttpCode (HttpStatus.OK)
    create (@Body () Posting: Posting): Promise <Posting> {
        return this.postingService.create (Posting)
    }

    @Put ()
    @HttpCode (HttpStatus.OK)
    update (@Body () Posting: Posting): Promise <Posting> {
        return this.postingService.update (Posting);
    }

    @Delete ('/:id')
    @HttpCode (HttpStatus.NO_CONTENT)
    delete (@Param ('id', ParseIntPipe) id: number) {
        return this.postingService.delete (id);
    }

}