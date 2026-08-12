export class User { // Class that will be used by UserService - Domain Entity
    constructor(
        public readonly id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public readonly createdAt: Date,
        public lastLoginAt: Date
    ) {}
}