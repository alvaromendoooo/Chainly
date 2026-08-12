import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersController } from './presentation/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra los repositorios asociados a este dominio
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
