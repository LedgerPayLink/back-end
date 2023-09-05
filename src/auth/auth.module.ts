import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {AtStrategy, RtStrategy} from "./strategies";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
      JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy]
})
export class AuthModule {}
