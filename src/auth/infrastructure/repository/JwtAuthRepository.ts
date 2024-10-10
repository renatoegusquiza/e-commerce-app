import { JwtService } from "@nestjs/jwt";
import { Token, AuthRepository } from "src/auth/domain/AuthRepository";
import { Injectable } from "src/common/Injectable";

@Injectable()
export class JwtAuthRepository implements AuthRepository{
    constructor(
        private jwtService: JwtService
    ){}

    async getToken(id: number, username: string): Promise<Token>{
        const access_token = await this.jwtService.signAsync({id, username})
        return {
            access_token
        }
    }
}