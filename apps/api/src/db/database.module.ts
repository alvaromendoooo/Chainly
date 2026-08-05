import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { databaseProvider } from "./database.providers";

@Module({
    imports: [ConfigModule],
    providers: [...databaseProvider],
    exports: [...databaseProvider],
})

export class DatabaseModule {}