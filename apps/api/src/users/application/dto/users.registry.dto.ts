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
import { integer } from 'yaml-language-server';

export class UserRegistryDTO {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail() 
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;


    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;

    @IsNotEmpty()
    @IsInt()
    @Min(18)
    @Max(100)
    age: integer;

    @IsOptional()
    @IsString()
    location?: string;
}