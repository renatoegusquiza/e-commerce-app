import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Injectable } from "./Injectable";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { jwtConstant } from "./constants/AuthConstant";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request)
        if(!token){
            throw new UnauthorizedException()
        }

        try{
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstant.secret
            });
            request['user'] = payload;
        } catch (error){
            throw new UnauthorizedException()
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined{
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type == 'Bearer' ? token : undefined
    }
}