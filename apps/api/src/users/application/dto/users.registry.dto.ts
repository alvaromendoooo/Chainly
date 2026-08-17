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
import { integer } from 'yaml-language-server';
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
    age!: integer;

    @IsOptional()
    @IsString()
    location?: string;
}

export class UserResponseDTO {
    @Expose() id!: string;
    @Expose() firstName!: string;
    @Expose() lastName!: string;
    @Expose() email!: string;
    @Expose() createdAt!: Date;

    @Exclude() passwordHash!: string;

    // Mapper of UserResponseDTO attributes with User domain attributes - excludes password for security
    static fromEntityFiltered(user: User): UserResponseDTO {
        return plainToInstance(UserResponseDTO, user, { excludeExtraneousValues: true });
    }

    // Mapper of UserResponseDTO attributes with User domain attributes - includes password
    static fromEntityRaw(user: User): UserResponseDTO {
        return plainToInstance(UserResponseDTO, user, { excludeExtraneousValues: false });
    }
}