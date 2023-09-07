import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import {APP_GUARD} from "@nestjs/core";
import {AtGuard} from "./common/guards";
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PayLinkModule } from './payLink/payLink.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, PayLinkModule, PaymentModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard
    },
    UserService
  ],
  controllers: [UserController]
})
export class AppModule {}
