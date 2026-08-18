import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRegistryDTO, UserResponseDTO } from 'src/users/application/dto/users.registry.dto';
import { UsersService } from 'src/users/application/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService, // AuthService will use some UserService's methods
        private readonly jwtService: JwtService, // Provides jwt behavior
    ) {}

    async register(dto: UserRegistryDTO): Promise<UserResponseDTO> {
        return this.userService.register(dto);   
    }

    async login(user: UserResponseDTO) {
        const payload = { email: user.email, sub: user.id}
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async validateUser(email: string, pass: string): Promise<UserResponseDTO> {
        let user: UserResponseDTO;

        try {
            user = await this.userService.findUser("email", email);
        } catch(error) {
            throw new UnauthorizedException("Invalid credentials, not user registered with email given");
        }

        const isValidPassword = await bcrypt.compare(pass, user.password); // Compares the password given with the password user has registered (hashed)
        if(!isValidPassword) {
            throw new UnauthorizedException("Invalid credentials, password does not match with registered")
        }

        return user; // Return user validated
    }
}
