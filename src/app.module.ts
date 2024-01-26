import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PayLinkModule } from './payLink/payLink.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import environment from './environment/environment';
import { TokensHelper } from './common/tokens';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigurationModule } from './configuration/configuration.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environment],
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    PayLinkModule,
    PaymentModule,
    ConfigurationModule,
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: './files',
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    UserService,
    TokensHelper,
  ],
  controllers: [UserController],
})
export class AppModule {}
