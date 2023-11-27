import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EoaDto } from '../common/dto';
import { TokensHelper } from '../common/tokens';
import { utils } from 'ethers';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private tokenService: TokensHelper,
  ) {
  }

  async addEOA(userId: string, eoa: EoaDto) {
    const user = await this.getUser(userId).then((u) => u);
    if (!user) throw new ForbiddenException('Access Denied');

    const chainFound = this.tokenService.chains.find(
      (c) => c.chainId == eoa.chainId,
    );
    if (!chainFound) throw new NotFoundException(`chain ${eoa.chainId} not supported`);

    const tokenFound = this.tokenService.tokens
      .get(chainFound.chainId)
      .find((t) => t.symbol == eoa.symbol);
    if (!tokenFound) throw new NotFoundException('token not supported');

    if (!utils.isAddress(eoa.EOAAddress)) throw new NotFoundException(`address given is not a valid address: ${eoa.EOAAddress}`);

    await this.prismaService.eoa.create({
      data: {
        chainId: eoa.chainId,
        symbol: tokenFound.symbol,
        tokenAddress: tokenFound.address,
        nativeToken: tokenFound.native,
        address: eoa.EOAAddress,
        ownerId: user.id,
      },
    });
  }

  async getUser(userId: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  ////////////////////////////////////  QUERIES  ////////////////////////////////////////////

  async getEOAS(userId: string): Promise<EoaDto[]> {
    return (await this.prismaService.eoa.findMany({
      where: {
        ownerId: userId,
      },
    }))
      .map(eoa => (
        {
          chainId: eoa.chainId,
          symbol: eoa.symbol,
          EOAAddress: eoa.address,
        }
      ),
    );
  }
}
