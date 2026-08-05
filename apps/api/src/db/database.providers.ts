import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";

export const databaseProvider = [
    {
        provide: 'SEQUELIZE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                password: configService.get<string>('DB_PASS'),
                database: configService.get<string>('DB_NAME')
            });
            sequelize.addModels([]); // Por incluir nuevos modelos definidos
            await sequelize.sync({ alter: true });
            return sequelize;
        },
    },
];