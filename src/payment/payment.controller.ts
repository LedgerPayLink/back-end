import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Public } from '../common/decorators';
import { CreatePaymentDto, GetTokenAmountDto } from './dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Public()
  @Post('create/:payLinkId')
  async createPayment(
    @Param('payLinkId') payLinkId: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentService.createPayment(payLinkId, createPaymentDto);
  }

  @Public()
  @Get('/tokenAmount')
  async getTokenAmount(@Query() getTokenAmountDto: GetTokenAmountDto) {
    return this.paymentService.getTokenAmount(getTokenAmountDto);
  }
}
