import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PayLinkDto } from './dto/payLink.dto';
import { FiatCurrency } from '../common/currency';
import { UserService } from '../user/user.service';
import { TokensHelper } from '../common/tokens';

@Injectable()
export class PayLinkService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private tokenService: TokensHelper,
  ) {}

  async createPayLink(userId: string, payLinkDto: PayLinkDto) {
    const currency = FiatCurrency.find((fc) => fc == payLinkDto.fiatCurrency);
    if (!currency)
      throw new NotFoundException(
        `Fiat Currency: ${payLinkDto.fiatCurrency} is not supported`,
      );

    // we check if the destination's chain is supported
    const destinationChain = this.tokenService.chains.find(
      (c) => c.chainId == payLinkDto.destinationChainId,
    );
    if (!destinationChain)
      throw new NotFoundException(
        `Chain: ${payLinkDto.destinationChainId} is not supported`,
      );

    // we check if user has at least 1 EOA with the payLinkDto chainId
    const user = await this.userService.getUser(userId).then((u) => u);

    const eoa = await this.prismaService.eoa
      .findFirst({
        where: {
          chainId: destinationChain.chainId,
          ownerId: user.id,
        },
      })
      .then((value) => value);

    if (!eoa)
      throw new NotFoundException(
        `No EOA created under chainId: ${destinationChain.chainId}`,
      );

    await this.prismaService.payLink.create({
      data: {
        fiatCurrency: payLinkDto.fiatCurrency,
        priceAmount: payLinkDto.priceAmount,
        destinationChainId: payLinkDto.destinationChainId,
        ownerId: user.id,
      },
    });
  }

  async getPayLinks(userId: string): Promise<PayLinkDto[]> {
    return (await this.prismaService.payLink.findMany({
      where: {
        ownerId: userId,
      },
    }))
      .map(payLink => (
          {
            fiatCurrency: payLink.fiatCurrency,
            priceAmount: payLink.priceAmount,
            destinationChainId: payLink.destinationChainId,
          }
        ),
      );
  }
}
