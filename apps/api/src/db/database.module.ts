import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Execution, NodeExecution } from "src/executions/executions.entity";
import { Node } from "src/nodes/node.entity";
import { Provider } from "src/providers/providers.entity";
import { User, UserConnection } from "src/users/users.entity";
import { Workflow } from "src/workflows/workflows.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASS'),
                database: configService.get<string>('DB_NAME'),
                entities: [
                    User,
                    Workflow,
                    Execution,
                    NodeExecution,
                    UserConnection,
                    Provider,
                    Node,
                ],
                synchronize: true, // solo para desarrollo
                autoLoadEntities: true,
            }),
        }),
    ],
})
export class DatabaseModule {}