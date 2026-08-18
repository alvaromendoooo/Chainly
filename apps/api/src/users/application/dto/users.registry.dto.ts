import { 
    IsEmail, 
    IsNotEmpty, 
    IsString, 
    IsStrongPassword, 
    IsInt, 
    Min, 
    Max, 
    IsOptional
} from 'class-validator';
import { User } from 'src/users/domain/users';
import { Exclude, Expose, plainToInstance } from 'class-transformer';

export class UserRegistryDTO {
    
    @IsNotEmpty()
    @IsString()
    firstName!: string;

    @IsNotEmpty()
    @IsString()
    lastName!: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail() 
    email!: string;

    @IsNotEmpty()
    @IsString()
    username!: string;


    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(18)
    @Max(100)
    age!: number;

    @IsOptional()
    @IsString()
    location?: string;
}

export class UserLoginDTO {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password!: string;
}

export class UserResponseDTO {
    @Expose() id!: string;
    @Expose() firstName!: string;
    @Expose() lastName!: string;
    @Expose() email!: string;
    @Expose() createdAt!: Date;

    @Expose({ groups: ['internal'] }) password!: string; // Creation of a group to differenciate where it should be exposed and where not

    // Mapper of UserResponseDTO attributes with User domain attributes - excludes password for security
    static fromEntityFiltered(user: User): UserResponseDTO {
        return plainToInstance(UserResponseDTO, user, { excludeExtraneousValues: true }); // No group included, passwordHash excluded
    }

    // Mapper of UserResponseDTO attributes with User domain attributes - includes password
    static fromEntityRaw(user: User): UserResponseDTO {
        return plainToInstance(UserResponseDTO, user, { excludeExtraneousValues: true, groups: ['internal'], }); // Now the group is included so passwordHash is exposed
    }
}