import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module.js';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller.js';
import { WorkflowsModule } from './workflows/workflows.module';
import { ExecutionsService } from './executions/executions.service';
import { ExecutionsModule } from './executions/executions.module';
import { ConnectorsController } from './connectors/connectors.controller';
import { ConnectorsModule } from './connectors/connectors.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    WorkflowsModule,
    ExecutionsModule,
    ConnectorsModule,
  ],
  controllers: [AppController, AuthController, ConnectorsController],
  providers: [AppService, AuthService, ExecutionsService],
})
export class AppModule { constructor(private dataSource: DataSource) {} }
