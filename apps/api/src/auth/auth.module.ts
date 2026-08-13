import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/application/users.service';

@Module({
  imports: [UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
