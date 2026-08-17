import { Controller, Request, Post, UseGuards, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserRegistryDTO } from 'src/users/application/dto/users.registry.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {};

    //@UseGuards(LocalAuthGuard) Example to use the user-guard
    @Post('register')
    async register(@Body() registerDTO: UserRegistryDTO, @Res() res: Response) {
        const userRegistry = await this.authService.register(registerDTO);
        return userRegistry;
    }
}
