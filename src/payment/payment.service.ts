import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreatePaymentDto} from "./dto/createPayment.dto";
import {COINS, TOKENS} from "../common/tokens";
import {convertToUSD} from "../common/currency";
import {getETHPriceInUSD} from "../common/contracts";

@Injectable()
export class PaymentService {

    constructor(private prismaService: PrismaService) {}

    async createPayment(payLinkId: string, createPaymentDto: CreatePaymentDto) {
        // 1 we check if the payLink id is valid
        const payLink = await this.prismaService.payLink.findUnique({
            where: {
                id: payLinkId
            }
        }).then(pl => pl)

        if (!payLink) throw new NotFoundException("Invalid PayLink");

        // 2 we check if the symbol is supported on the payLink destinationChainId
        const chain = payLink.destinationChainId
        const symbol = createPaymentDto.symbol

        let native = false;
        let tokenAddress: string;
        const tokenFound = TOKENS.find(t => t.symbol == symbol);
        if (!tokenFound) {
            const coinFound = COINS.find(c => c.chainId == chain && c.symbol == symbol);
            if (!coinFound) throw new NotFoundException(`symbol ${symbol} on chain id ${chain} is not supported`)
            native = true;
        } else {
            tokenAddress = tokenFound.address;
        }

        // 3 we check if the tokenAmount is ok according to current quote (we validate a slight slippage difference)
        const centsUSD = await convertToUSD(payLink.fiatCurrency, payLink.priceAmount);
        const tokenUSDPrice = await getETHPriceInUSD()

        console.log(centsUSD, tokenUSDPrice)

        //4 we create the raw transaction also Approve if needed


    }
}
