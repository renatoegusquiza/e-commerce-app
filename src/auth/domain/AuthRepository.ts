export interface Token{
    access_token: string 
}

export abstract class AuthRepository {
    abstract getToken(id: number, username: string): Promise<Token>;
    
}