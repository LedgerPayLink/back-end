import {AlphaRouter, SwapOptionsSwapRouter02, SwapRoute, SwapType} from '@uniswap/smart-order-router'
import { ChainId, Percent, CurrencyAmount, TradeType } from '@uniswap/sdk-core';
import {BigNumber, ethers, utils} from "ethers";
import JSBI from "jsbi";
import {CurrentConfig} from "./config";
import {fromReadableAmount} from "./conversion";
import {Pool} from "@uniswap/v3-sdk";
import {
    V2RouteWithValidQuote,
    V3RouteWithValidQuote
} from "@uniswap/smart-order-router/build/main/routers/alpha-router/entities/route-with-valid-quote";

const provider = new ethers.providers.JsonRpcProvider(CurrentConfig.rpc.eth)

const router = new AlphaRouter({
    chainId: ChainId.MAINNET,
    provider,
})

const options: SwapOptionsSwapRouter02 = {
    recipient: CurrentConfig.wallet.address,
    slippageTolerance: new Percent(50, 10_000),
    deadline: Math.floor(Date.now() / 1000 + 1800),
    type: SwapType.SWAP_ROUTER_02,
}

const rawTokenAmountOut: JSBI = fromReadableAmount(
    CurrentConfig.tokens.amountOut,
    CurrentConfig.tokens.out.decimals
)

async function getRoute(): Promise<SwapRoute> {
    return await router.route(
        CurrencyAmount.fromRawAmount(
            CurrentConfig.tokens.out,
            rawTokenAmountOut
        ),
        CurrentConfig.tokens.in,
        TradeType.EXACT_OUTPUT,
        options
    )
}

getRoute().then(r => {
    console.log(r.quote.currency.wrapped.address + " " + r.quote.currency.name + ": " + r.quote.toFixed())
    console.log("block: " + r.blockNumber.toNumber())
    // console.log(r.quoteGasAdjusted.toFixed(10))
    // console.log(r.trade.priceImpact.toFixed(10))
    const paths: string[] = [];
    r.route.forEach((_route: V3RouteWithValidQuote , index) => {
        console.log( _route instanceof V3RouteWithValidQuote);
        console.log(`route ${index}, precent: ${_route.percent},tokenInAmount: ${_route.quote.toFixed()}, tokenOutAmount: ${_route.amount.toFixed()}`)
        // _route.tokenPath.forEach(console.log)
        if (_route instanceof V3RouteWithValidQuote) {
            const types = [];
            const values = [];
            _route.route.pools.forEach((p: Pool, i: number) => {
                console.log(`token0 ${p.token0.name} ${p.token0.address}`)
                console.log(`fee ${p.fee.toFixed(0)}`)
                console.log(`token1 ${p.token1.name} ${p.token1.address}`)
                let tokenIn;
                if (i == 0) {
                    tokenIn = r.quote.currency.wrapped.address == p.token0.address ? p.token0 : p.token1
                    types.push("address");
                    values.push(tokenIn.address);
                }
                types.push("uint24");
                values.push(p.fee.toFixed(0));
                types.push("address");
                values.push(values.find(v => p.token0.address == v) ? p.token1.address : p.token0.address);
            })
            const reversed = values.reverse();
            console.log(reversed)
            console.log(utils.solidityPack(types, reversed));
        }

    })
})


