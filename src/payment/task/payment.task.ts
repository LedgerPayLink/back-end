import { Injectable, Logger } from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {PaymentService} from "../payment.service";
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class TaskPaymentService {

    private readonly logger = new Logger(TaskPaymentService.name);

    constructor(
        private paymentService: PaymentService,
        private prismaService: PrismaService
    ) {}


    @Cron(CronExpression.EVERY_2_HOURS)
    async onValidatePayment() {
        this.logger.debug('validate Payment task is started');
        const payments = await this.prismaService.payment
            .findMany({
                where: {
                    status: 'PENDING',
                },
            })
            .then((p) => p);
        if (payments.length == 0) {
            this.logger.debug('No payments found, exiting');
            return;
        }
        for (const p of payments) {
            await this.paymentService.validatePayment(p.id)
        }

        this.logger.debug('validate Payment task is finished');
        return;
    }
}
