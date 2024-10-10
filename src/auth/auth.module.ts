import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controller/AuthController';
import { AuthService } from 'src/application/AuthService';
import { InMemoryUserRepository } from './infrastructure/repository/InMemoryUserRepository';
import { JwtAuthRepository } from './infrastructure/repository/JwtAuthRepository';
import { UserRepository } from './domain/UserRepository';
import { AuthRepository } from './domain/AuthRepository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/common/constants/AuthConstant';
//import { AuthService } from './auth.service';
//import { AuthController } from './auth.controller';

@Module({
  imports:[
    JwtModule.register({
      global: true, //? con esto está disponible para todo
      secret: jwtConstant.secret,
      signOptions: { 
        expiresIn: jwtConstant.expiresIn 
      },
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    InMemoryUserRepository, 
    JwtAuthRepository,
    {
      provide: UserRepository,
      useExisting: InMemoryUserRepository
    },
    {
      provide: AuthRepository,
      useExisting: JwtAuthRepository
    }
  ],
})
export class AuthModule {}
