import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { convertToUSD } from '../common/currency';
import { getTokenPriceInUSDCent } from '../common/contracts';
import { CreatePaymentDto, GetTokenAmountDto } from './dto';
import { TokensHelper } from '../common/tokens';
import getLedgerPayLinkContract from "../common/contracts/ledgerPayLink/ledgerPayLink.contract";
import {providers, utils} from "ethers";
import EthDater from "ethereum-block-by-date";
import {urls} from "../common/providers";

@Injectable()
export class PaymentService {

  private readonly SWAP_FEE = 0.01 + 0.003; // 1% LPL fee + 0.3% swap protocol fee
  private readonly logger = new Logger(PaymentService.name);
  constructor(
    private prismaService: PrismaService,
    private tokenService: TokensHelper,
  ) {}

  async createPayment(payLinkId: string, createPaymentDto: CreatePaymentDto,): Promise<{ paymentId: string }> {
    // 1 we check if the payLink id is valid
    const payLink = await this.prismaService.payLink
      .findUnique({
        where: {
          id: payLinkId,
        },
      })
      .then((pl) => pl);

    if (!payLink) throw new NotFoundException('PayLink Not Found');

    const payments = await this.prismaService.payment
        .findMany({
          where: {
            payLinkId: payLinkId,
            status: 'SUCCESS'
          },
        })
        .then((p) => p);

    payments.forEach(p => {
      if (p.priceAmountInCents == payLink.priceAmountInCents) throw new NotFoundException('PayLink given already has been paid full');
    })

    // 2 we check if the owner has at least 1 EOA on the chainId
    const chain = payLink.destinationChainId;
    const eoa = await this.prismaService.eoa
      .findFirst({
        where: {
          ownerId: payLink.ownerId,
          chainId: chain,
        },
      })
      .then((eoa) => eoa);

    if (!eoa) throw new NotFoundException('no EOA found');

    // 3 we check if the tokenAmount is ok according to current quote (we validate a slight slippage difference)

    const tokenAmountFound = await this._getTokenAmount(
      createPaymentDto.symbol,
      payLink.fiatCurrency,
      payLink.priceAmountInCents,
      eoa.symbol != createPaymentDto.symbol
    );


    const per1000Change = this.getPer1000Change(
      createPaymentDto.tokenAmount,
      tokenAmountFound,
    );
    if (per1000Change >= createPaymentDto.slippagePer1000) {
      throw new NotFoundException(
        `over tolerated slippage, more than ${per1000Change / 10} % change`,
      );
    }

    // 4 we create the payment

    // const tokenAmountWei = BigInt(tokenAmountFound ** (eoa.nativeToken ? 18 : (await getErc20Contract(eoa.tokenAddress, payLink.destinationChainId).decimals())))
    const tokenAmountWei = utils.parseUnits(tokenAmountFound.toString(), 18).toString()

    const { id } = await this.prismaService.payment.create({
      data: {
        expirationDate: new Date(new Date().setHours(4)),
        priceAmountInCents: payLink.priceAmountInCents,
        fiatCurrency: payLink.fiatCurrency,
        chainId: payLink.destinationChainId,
        symbol: createPaymentDto.symbol,
        tokenAddress: eoa.tokenAddress,
        isTokenNative: eoa.nativeToken,
        tokenAmount: tokenAmountWei,
        destinationAddress: eoa.address,
        status: 'PENDING',
        payLinkId: payLinkId,
      },
    });

    return { paymentId: id };
  }

  async getTokenAmount(
    payLinkId: string,
    getTokenAmountDto: GetTokenAmountDto)
    : Promise<number> {
    const payLink = await this.prismaService.payLink
      .findUnique({
        where: {
          id: payLinkId,
        },
      })
      .then((pl) => pl);

    if (!payLink) throw new NotFoundException('PayLink Not Found');

    // we check if it is a swap context
    const eoa = await this.prismaService.eoa
      .findFirst({
        where: {
          ownerId: payLink.ownerId,
          chainId: payLink.destinationChainId,
        },
      })
      .then((eoa) => eoa);

    if (!eoa) throw new NotFoundException('no EOA found');

    const swapContext = eoa.symbol != getTokenAmountDto.selectedSymbol;

    return this._getTokenAmount(getTokenAmountDto.selectedSymbol, payLink.fiatCurrency, payLink.priceAmountInCents, swapContext);
  }

  async validatePayment(paymentId: string): Promise<void> {
    const payment = await this.prismaService.payment
        .findUnique({
          where: {
            id: paymentId,
          },
        })
        .then((p) => p);

    if (!payment) throw new NotFoundException('Payment Not Found');


    const tokenFound = this.tokenService.tokens
      .get(payment.chainId)
      .find((t) => t.symbol == payment.symbol);

    const dater = new EthDater(
        new providers.JsonRpcProvider(urls.get(payment.chainId))
    );

    const fromBlock = dater.getDate(payment.createdAt)

    const ledgerPayLinkContract = getLedgerPayLinkContract(payment.chainId)
    if (tokenFound.native) {

    } else {
      const filter = ledgerPayLinkContract.filters.LPL_PaidWithToken(paymentId)
      const events = await ledgerPayLinkContract.queryFilter(filter, fromBlock.block);
      if (events.length == 0) {
        //TODO mark the payment as checked +1
        this.logger.error(`No LPL_PaidWithToken event found with paymentId: ${paymentId}`);
        return;
      }
      const paidWithTokenEvent = events[0];
      const paidWithTokenLogDescription = ledgerPayLinkContract.interface.parseLog({
        data: paidWithTokenEvent.data,
        topics: paidWithTokenEvent.topics
      })
      const tokenAddress = paidWithTokenLogDescription.args[1] as string;
      const tokenAmount = paidWithTokenLogDescription.args[2] as bigint;
      const destinationAddress = paidWithTokenLogDescription.args[3] as string;

      console.log(
          tokenAddress,
          tokenAmount.toString(),
          destinationAddress
      )

      if (tokenAddress == payment.tokenAddress && tokenAmount.toString() == payment.tokenAmount && destinationAddress == payment.destinationAddress) {
        await this.prismaService.payment.update({
          where: {
            id: paymentId
          },
          data: {
            status: 'SUCCESS',
            txHash: paidWithTokenEvent.transactionHash
          }
        })
        this.logger.log(`payment ${paymentId} has been validated`);
      }

    }


  }

  private async _getTokenAmount(
    selectedSymbol: string,
    fiatCurrency: string,
    priceAmountInCents: number,
    swapContext: boolean
  ) {
    const centsUSD =
      fiatCurrency == 'USD'
        ? priceAmountInCents
        : await convertToUSD(
          fiatCurrency.toUpperCase(),
          priceAmountInCents,
        );
    let tokenPriceInUSDCents: number;
    if (selectedSymbol == 'ERC20TEST') {
      tokenPriceInUSDCents = 43; // $0.43
    } else {
      tokenPriceInUSDCents = await getTokenPriceInUSDCent(
        selectedSymbol.toUpperCase(),
      );
    }

    const tokenAmount = centsUSD / tokenPriceInUSDCents;
    return swapContext ? tokenAmount * (1 + this.SWAP_FEE) : tokenAmount;

  }

  private getPer1000Change(oldValue: number, newValue: number): number {
    return (Math.abs(newValue - oldValue) / oldValue) * 1000;
  }
}
