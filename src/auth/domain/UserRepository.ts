export interface User{
    id: number;
    username: string;
    password: string
}

export abstract class UserRepository {
    abstract findByUsername(username: string): Promise<User>;
}