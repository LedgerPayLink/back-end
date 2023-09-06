import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {PayLinkDto} from "./dto/payLink.dto";
import {FiatCurrency} from "../common/currency";
import {CHAINS} from "../common/tokens";
import {UserService} from "../user/user.service";

@Injectable()
export class PayLinkService {

    constructor(
        private prismaService: PrismaService,
        private userService: UserService
    ) {
    }

    async createPayLink(userId: string, payLinkDto: PayLinkDto) {
        const currency = FiatCurrency.find(fc => fc == payLinkDto.fiatCurrency);
        if (!currency) throw new NotFoundException(`Fiat Currency: ${payLinkDto.fiatCurrency} is not supported`)

        // we check if the destination's chain is supported
        const destinationChain = CHAINS.find(c => c.chainId == payLinkDto.destinationChainId);
        if (!destinationChain) throw new NotFoundException(`Chain: ${payLinkDto.destinationChainId} is not supported`)

        // we check if user has at least 1 EOA with the payLinkDto chainId
        const user = await this.userService.getUser(userId).then(u => u);

        const eoas = await this.prismaService.eoa.findMany({
            where: {
                chainId: destinationChain.chainId,
                ownerId: user.id
            },
        })

        if (eoas.length == 0) throw new NotFoundException(`No EOA created under chainId: ${destinationChain.chainId}`)

        await this.prismaService.payLink.create({
            data: {
                fiatCurrency: payLinkDto.fiatCurrency,
                priceAmount: payLinkDto.priceAmount,
                destinationChainId: payLinkDto.destinationChainId,
                ownerId: user.id
            }
        })
    }
}
