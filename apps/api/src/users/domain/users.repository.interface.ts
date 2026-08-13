import { User } from "./users";

export const USER_REPOSITORY = 'USER_REPOSITORY';

// Developement contract for different implementations
export interface IUserRepository {
    findByAllowedField(fieldName: string, value?: string | number): Promise<User | null>;
    save(user: User): Promise<User>;
    update(user: User, props: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}