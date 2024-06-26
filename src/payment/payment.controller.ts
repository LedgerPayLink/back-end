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
  @Post('validate/:paymentId')
  async validatePayment(
      @Param('paymentId') paymentId: string,
  ) {
    return this.paymentService.validatePayment(paymentId);
  }

  @Public()
  @Get('tokenAmount/:payLinkId')
  async getTokenAmount(
    @Param('payLinkId') payLinkId: string,
    @Query() getTokenAmountDto: GetTokenAmountDto
  ) {
    return this.paymentService.getTokenAmount(getTokenAmountDto);
  }
}
