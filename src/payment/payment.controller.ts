import {Body, Controller, Param, Post} from '@nestjs/common';
import {PaymentService} from "./payment.service";
import {Public} from "../common/decorators";
import {CreatePaymentDto} from "./dto/createPayment.dto";

@Controller('payment')
export class PaymentController {

    constructor(private paymentService: PaymentService) {}

    @Public()
    @Post('create/:payLinkId')
    async createPayment(
        @Param('payLinkId') payLinkId: string,
        @Body() createPaymentDto: CreatePaymentDto
    ) {
        return this.paymentService.createPayment(payLinkId, createPaymentDto);
    }
}
