import { User, UserRepository } from "src/auth/domain/UserRepository";
import { Injectable } from "src/common/Injectable";

@Injectable()
export class InMemoryUserRepository implements UserRepository{
    private readonly users = [
        { 
            id: 1,
            username: 'John Doe',
            password: 'hola123'}
    ]

    async findByUsername(username: string): Promise<User>{
        return this.users.find((user) => user.username === username);
    }
}