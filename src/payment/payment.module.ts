import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import {TokensHelper} from "../common/tokens";

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, TokensHelper]
})
export class PaymentModule {}
