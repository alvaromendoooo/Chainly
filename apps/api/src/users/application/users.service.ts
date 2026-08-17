import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY, type IUserRepository } from '../domain/users.repository.interface';
import { UserRegistryDTO, UserResponseDTO } from './dto/users.registry.dto';
import { User } from '../domain/users';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService { 
    constructor(
        @Inject(USER_REPOSITORY) // Compiler goes to module and search for providers with this 'token', then it knows the class that belongs to this instance
        private readonly userRepository: IUserRepository, // Interfaces are not readable in compilance mode
    ) {}

    async register(data: UserRegistryDTO): Promise<UserResponseDTO> {
        // First we look for the credentials of existing users, trying to see if current user is already registered
        const existingUser = await this.userRepository.findByAllowedField(
            "email", data.email
        );

        if(existingUser) throw new ConflictException("User allready registered");

        /* Create new entity to register with param's data
        - Create an artifical publicId associated to the instance
        - Hash the given password
        - Map fields with User instance
        */
        // -- PublicId
        let generatedUuid = uuidv4();
        // -- Hashed password
        let passwordHash: string;
        try {
            passwordHash = await this.hashPasswords(data.password);
        } catch (err) {
            throw new InternalServerErrorException('No se pudo procesar la contraseña'); // TODO devolver tipos de error: 500, etc.
        }
        // -- Domain instance creation
        const newRegistry = new User(
            generatedUuid,
            data.firstName,
            data.lastName,
            data.email,
            passwordHash,
            new Date(),
            new Date()
        );

        const userSaved = await this.userRepository.save(newRegistry);

        if(!userSaved) {
            throw new InternalServerErrorException("Something went wrong trying to register user into the server");
        }
        return UserResponseDTO.fromEntityFiltered(userSaved); // I want to show some data from User instance, not all - security aspect
    }

    // Given field name and its value, returns matched user or throws an error
    async findUser(field: string, value: string): Promise<any> {
        const user = await this.userRepository.findByAllowedField(field, value);

        if(!user) {
            throw new NotFoundException("Something went wrong trying to find an user using this field: " + field + " and this value: " + value);
        }
        return UserResponseDTO.fromEntityRaw(user);
    }

    private async hashPasswords(password: string): Promise<string> {
        const saltRounds = 10; // Determines the complexity of the hashing process
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    }
}
