import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserRegistryDTO, UserResponseDTO } from 'src/users/application/dto/users.registry.dto';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {};

    //@UseGuards(LocalAuthGuard) Example to use the user-guard
    @Post('register')
    async register(@Body() registerDTO: UserRegistryDTO) {
        return await this.authService.register(registerDTO);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@GetUser() user: UserResponseDTO) { // Custom decorator to convert user-request type from User to UserResponseDTO
        return await this.authService.login(user);
    }
}
