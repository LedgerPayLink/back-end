import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {EoaDto} from "./dto";
import {isAddress} from "ethers";
import {TokensHelper} from "../common/tokens";

@Injectable()
export class UserService {

    constructor(
        private prismaService: PrismaService,
        private tokenService: TokensHelper
    ) {}

    async addEOA(userId: string, eoa: EoaDto) {

        const user = await this.getUser(userId).then(u => u);
        if (!user) throw new ForbiddenException("Access Denied")

        const chainFound = this.tokenService.chains.find(c => c.chainId == eoa.chainId)
        if (!chainFound) throw new NotFoundException(`chain ${eoa.chainId} not supported`)

        const tokenFound = this.tokenService.tokens.get(chainFound.chainId).find(t => t.symbol == eoa.symbol);
        if (!tokenFound) throw new NotFoundException("token not supported")

        if (!isAddress(eoa.address)) throw new NotFoundException("address given is not a valid address")

        const eoaDb = await this.prismaService.eoa.findFirst({
            where: {
                ownerId: userId,
                chainId: chainFound.chainId
            }
        }).then(eoa => eoa);

        if (eoaDb) {
            await this.prismaService.eoa.delete({
                where: {
                    id: eoaDb.id
                }
            })
        }

        await this.prismaService.eoa.create({
            data: {
                chainId: eoa.chainId,
                symbol: tokenFound.symbol,
                tokenAddress: tokenFound.address,
                nativeToken: tokenFound.native,
                address: eoa.address,
                ownerId: user.id
            }
        })



    }

    async getUser(userId: string) {
        return this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        })
    }
}
