import { AuthRepository, Token } from "src/auth/domain/AuthRepository";
import { UserRepository } from "src/auth/domain/UserRepository";
import { CustomException } from "src/common/CustomException";
import { Injectable } from "src/common/Injectable";

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private authRepository: AuthRepository
    ){}

    async login(username: string, password: string): Promise<Token>{
        const user = await this.userRepository.findByUsername(username);
        
        if (user?.password !== password) {
            throw new CustomException('Unauthorized', 401 , {});
        }

        return this.authRepository.getToken(user.id, user.username);
    }
}
