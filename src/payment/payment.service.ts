import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { convertToUSD } from '../common/currency';
import { getTokenPriceInUSDCent } from '../common/contracts';
import { CreatePaymentDto, GetTokenAmountDto } from './dto';
import { TokensHelper } from '../common/tokens';

@Injectable()
export class PaymentService {
  constructor(
    private prismaService: PrismaService,
    private tokenService: TokensHelper,
  ) {}

  async createPayment(
    payLinkId: string,
    createPaymentDto: CreatePaymentDto,
  ): Promise<{ paymentId: string }> {
    // 1 we check if the payLink id is valid
    const payLink = await this.prismaService.payLink
      .findUnique({
        where: {
          id: payLinkId,
        },
      })
      .then((pl) => pl);

    if (!payLink) throw new NotFoundException('Invalid PayLink');

    // 2 we check if the owner has at least 1 EOA on the chainId
    const chain = payLink.destinationChainId;
    const eoas = await this.prismaService.eoa
      .findMany({
        where: {
          ownerId: payLink.ownerId,
          chainId: chain,
        },
      })
      .then((eoas) => eoas);

    if (eoas.length == 0) throw new NotFoundException('no EOA found');

    // 3 we only select the eoas tokens
    const symbol = createPaymentDto.symbol;

    // const tokenFound = this.tokenService.tokens
    //   .get(chain)
    //   .find((t) => t.symbol == symbol);
    // if (!tokenFound)
    //   throw new NotFoundException(
    //     `symbol ${symbol} on chain id ${chain} is not supported`,
    //   );
    const tokenFound = eoas.find((eoa) => eoa.symbol == symbol);
    if (!tokenFound)
      throw new NotFoundException(
        `symbol ${symbol} on chain id ${chain} is not supported`,
      );

    // 4 we check if the tokenAmount is ok according to current quote (we validate a slight slippage difference)

    const tokenAmountFound = await this.getTokenAmount({
      fiatCurrency: payLink.fiatCurrency,
      amountInCents: payLink.priceAmount,
      symbol: createPaymentDto.symbol,
    });

    const per1000Change = this.getPer1000Change(
      createPaymentDto.tokenAmount,
      tokenAmountFound,
    );
    if (per1000Change >= createPaymentDto.slippagePer1000) {
      throw new NotFoundException(
        `over tolerated slippage, more than ${per1000Change / 10} % change`,
      );
    }

    // 5 we create the payment

    const { id } = await this.prismaService.payment.create({
      data: {
        expirationDate: new Date(new Date().setHours(4)),
        priceAmount: payLink.priceAmount,
        fiatCurrency: payLink.fiatCurrency,
        chainId: payLink.destinationChainId,
        symbol: createPaymentDto.symbol,
        tokenAmount: tokenAmountFound,
        status: 'PENDING',
        payLinkId: payLinkId,
      },
    });

    return { paymentId: id };
  }

  async getTokenAmount(getTokenAmountDto: GetTokenAmountDto): Promise<number> {
    const centsUSD =
      getTokenAmountDto.fiatCurrency == 'USD'
        ? getTokenAmountDto.amountInCents
        : await convertToUSD(
            getTokenAmountDto.fiatCurrency.toUpperCase(),
            getTokenAmountDto.amountInCents,
          );
    let tokenPriceInUSDCents: number;
    if (getTokenAmountDto.symbol == 'ERC20TEST') {
      tokenPriceInUSDCents = 43; // $0.43
    } else {
      tokenPriceInUSDCents = await getTokenPriceInUSDCent(
        getTokenAmountDto.symbol.toUpperCase(),
      );
    }

    return centsUSD / tokenPriceInUSDCents;
  }

  private getPer1000Change(oldValue: number, newValue: number): number {
    return (Math.abs(newValue - oldValue) / oldValue) * 1000;
  }
}
