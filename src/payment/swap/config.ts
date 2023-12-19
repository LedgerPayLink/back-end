import {ChainId, Token} from '@uniswap/sdk-core'
import {
    DAI_BNB,
    DAI_MAINNET,
    DAI_POLYGON,
    FEI_MAINNET,
    USDC_BNB,
    USDC_MAINNET,
    USDC_POLYGON, USDT_BNB, USDT_MAINNET, WMATIC_POLYGON
} from "@uniswap/smart-order-router";
import {ethers} from "ethers";
import {AAVE_MAINNET, UNI_MAINNET} from "@uniswap/smart-order-router/build/main/providers/token-provider";

interface ExampleConfig {
    rpc: {
        // local: string
        eth: string
        bsc: string
        polygon: string
    }
    wallet: {
        address: string
        // privateKey: string
    }
    tokens: {
        in: Token
        amountOut: number
        out: Token
    }
}

export const CurrentConfig: ExampleConfig = {
    rpc: {
        bsc: "https://spring-capable-sponge.bsc.quiknode.pro/d65af8ceec5369ffd08559fdfacb9d80b8b33be0",
        eth: "https://mainnet.infura.io/v3/df99674aba224b7194774125b0712c95",
        polygon: "https://polygon-mainnet.infura.io/v3/df99674aba224b7194774125b0712c95",
    },
    wallet: {
        address: "0x2B480c63bDe7C764cadBaA8b181405D770728128"
    },
    tokens: {
        in: USDC_MAINNET,
        amountOut: 3000,
        out: DAI_MAINNET
    }
}
