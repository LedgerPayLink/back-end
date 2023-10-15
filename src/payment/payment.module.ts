import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import {TokensHelper} from "../common/tokens";
import {TaskPaymentService} from "./task/payment.task";

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, TokensHelper, TaskPaymentService]
})
export class PaymentModule {}
