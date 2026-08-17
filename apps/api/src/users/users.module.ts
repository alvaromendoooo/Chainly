import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersController } from './presentation/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/users.entity';
import { TypeORMUserRepository } from './infrastructure/typeorm-users.repository';
import { USER_REPOSITORY } from './domain/users.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], // Register the entities associated to this domain
  providers: [
    UsersService, 
    TypeORMUserRepository,
    { 
      provide: USER_REPOSITORY, // Services only use the interface -Clean Architecture-, doing this, the services do not know which type of Repository is going to execute
      useClass: TypeORMUserRepository // Having different ORM repositories, we need to specify which one will we provide for its execution
    },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
