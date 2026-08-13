import { Injectable } from "@nestjs/common";
import { UserEntity } from "./users.entity";
import { User } from "../domain/users";
import { IUserRepository } from "../domain/users.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TypeORMUserRepository implements IUserRepository {

    constructor(
        @InjectRepository(UserEntity) // Needed the injection of ORM registered repository to work with it
        private readonly repository: Repository<UserEntity>,
    ) {}

    // Implemented in a more abstract way because I reduce the number of functions definitions and repetitive code
    async findByAllowedField(fieldName: string, value?: string | number): Promise<User | null> {
        const allowedFields = ['id', 'email']; // Defined the allowed attributes to find users

        if (!allowedFields.includes(fieldName) || value == null) { // If param fieldName or value of that field are not valid, end function
            return null;
        }

        const userEntity = await this.repository.findOne({ // Get the first entity that matches where expression
            where: { [fieldName]: value }, // e.g: [id] : 32 -- VALID expression
        });

        if (!userEntity) { // If we don't find any entity, end function
            return null;
        }

        return this.toDomain(userEntity); // Return domain entity from ORM entity
    }

    async save(user: User): Promise<User> {
        const userEntity = this.toEntity(user); // Change user domain instance into user ORM entity 

        const userSaved = await this.repository.save(userEntity); // Save entity into DB

        return this.toDomain(userSaved);
    }

    async update(user: User, props: Partial<User>): Promise<User> {
        const updatedUser = Object.assign(
            Object.create(Object.getPrototypeOf(user)), // Create an empty user object but with same structure as user param
            user, // source 1 - copy all of his properties into target - empty user object
            props, // source 2 - override source 1 data if is appropiate, otherwise target mantains source 1 values.
        );

        const userEntity = this.toEntity(updatedUser);

        const savedEntity = await this.repository.save(userEntity);

        return this.toDomain(savedEntity);
    }

    async delete(id: number): Promise<void> {
        const userEntity = await this.repository.findOne({ // Find the DB entity that matches the id from params
            where: { id }
        });

        if (!userEntity) { // If it doesn't find the entity, throw an error to inform that nothing will be deleted
            throw new Error("Can't delete a non existant entity");
        }

        await this.repository.delete(id); // Delete entity from DB by id
    }

    private toDomain(entity: UserEntity): User {
        return new User(
            entity.publicId,
            entity.firstName,
            entity.lastName,
            entity.email,
            entity.passwordHash,
            entity.createdAt,
            entity.lastLoginAt
        );
    }

    private toEntity(user: User): UserEntity {
        const { id, password, ...rest } = user; // Get attribute names from User instance that differe from UserEntity instance

        return Object.assign(new UserEntity, rest, { // Asign attributes from User to UserRegistry that are named the same, 
                                                    // rest of them are mapped for proper behavior.
            publicId: id,
            passwordHash: password
        },);
    }
}