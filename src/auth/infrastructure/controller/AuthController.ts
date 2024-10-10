import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "src/application/AuthService";

@Controller('v1/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: Record<string, any>){
        return await this.authService.login(loginDto.username, loginDto.password);
    }
}