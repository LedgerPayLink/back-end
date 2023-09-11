import {ConfigService} from "@nestjs/config";
import {MAINNET_TOKENS, TESTNET_TOKENS, Token} from "./TOKENS";
import {Chain, MAINNET_CHAINS, TESTNET_CHAINS} from "./CHAINS";
import {Injectable} from "@nestjs/common";

@Injectable()
export class TokensHelper {

    public tokens: Map<number, Token[]>

    public chains: Chain[];

    constructor(private configService: ConfigService) {
        const chainMode = configService.get<string>('chain_mode')
        this.chains = chainMode == "TESTNET" ? TESTNET_CHAINS : MAINNET_CHAINS
        this.tokens = chainMode == "TESTNET" ? TESTNET_TOKENS : MAINNET_TOKENS
    }


}
