import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {EoaDto} from "./dto";
import {CHAINS, Coin, COINS, TOKENS} from "../common/tokens";
import {isAddress} from "ethers";

@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService) {}

    async addEOA(userId: string, eoa: EoaDto) {

        const user = await this.getUser(userId).then(u => u);
        if (!user) throw new ForbiddenException("Access Denied")

        const chainFound = CHAINS.find(c => c.chainId == eoa.chainId)
        if (!chainFound) throw new NotFoundException("chain not supported")

        let symbol: string;
        let tokenAddress: string;
        let native = false;
        let coinFound: Coin;
        const tokenFound = TOKENS.find(t => t.symbol == eoa.symbol);
        if (!tokenFound) {
            coinFound = COINS.find(c => c.symbol == eoa.symbol);
            if (!coinFound) throw new NotFoundException("token not supported")
            symbol = coinFound.symbol;
            native = true;
        } else {
            symbol = tokenFound.symbol;
            tokenAddress = tokenFound.address
        }


        if (!isAddress(eoa.address)) throw new NotFoundException("address given is not a valid address")

        await this.prismaService.eoa.create({
            data: {
                chainId: eoa.chainId,
                symbol: symbol,
                tokenAddress: tokenAddress,
                nativeToken: native,
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
