import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { themeController } from "./controllers/theme.controller";
import { Theme } from "./entities/theme.entity";
import { ThemeService } from "./services/theme.service";

@Module ({
    imports: [TypeOrmModule.forFeature([Theme])],
    providers: [ThemeService],
    controllers: [themeController],
    exports: [TypeOrmModule]
})
export class ThemeModule {}