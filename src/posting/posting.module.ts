import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Posting } from "./entities/posting.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Posting])],
    providers: [],
    controllers: [],
    exports: [TypeOrmModule]
})
export class PostingModule {}