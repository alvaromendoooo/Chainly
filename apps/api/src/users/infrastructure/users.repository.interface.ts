import { User } from "../domain/users";
import { UserEntity } from "./users.entity";

// Developement contract for different implementations
export interface IUserRepository {
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<User>;
    update(user: User, props: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
}