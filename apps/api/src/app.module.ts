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
import { ProvidersController } from './providers/providers.controller.js';
import { ProvidersModule } from './providers/providers.module.js';
import { DataSource } from 'typeorm';
import { UsersController } from './users/presentation/users.controller.js';
import { WorkflowsController } from './workflows/workflows.controller.js';
import { ExecutionsController } from './executions/executions.controller.js';
import { ProvidersService } from './providers/providers.service.js';
import { UsersService } from './users/application/users.service.js';
import { NodesController } from './nodes/nodes.controller.js';
import { NodesService } from './nodes/nodes.service.js';
import { WorkflowsService } from './workflows/workflows.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    WorkflowsModule,
    ExecutionsModule,
    ProvidersModule,
  ],
  controllers: [
    AppController, 
    AuthController, 
    ProvidersController,
    UsersController,
    WorkflowsController,
    ExecutionsController,
    NodesController,
  ],
  providers: [
    AppService, 
    AuthService, 
    ExecutionsService,
    ProvidersService,
    UsersService,
    NodesService,
    WorkflowsService
  ],
})
export class AppModule { constructor(private dataSource: DataSource) {} }
