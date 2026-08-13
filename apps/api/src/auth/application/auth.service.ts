import { Injectable } from '@nestjs/common';
import { UserRegistryDTO, UserResponseDTO } from 'src/users/application/dto/users.registry.dto';
import { UsersService } from 'src/users/application/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService // AuthService will use some UserService's methods
    ) {}

    async register(dto: UserRegistryDTO): Promise<UserResponseDTO> {
        return this.userService.register(dto);   
    }
}
