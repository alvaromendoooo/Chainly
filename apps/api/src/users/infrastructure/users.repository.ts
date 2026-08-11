import { Injectable } from "@nestjs/common";
import { User } from "../domain/users.entity";
import { IUserRepository } from "./users.repository.interface";

@Injectable()
export class TypeORMUserRepository implements IUserRepository {
    async findById(id: string): Promise<User | null> {
        // TODO
    }

    async findByEmail(email: string): Promise<User | null> {
        // TODO
    }

    async save(user: User): Promise<User> {
        // TODO
    }

    async update(user: User, props: Partial<User>): Promise<User> {
        // TODO
    }

    async delete(id: string): Promise<void> {
        // TODO
    }
}

