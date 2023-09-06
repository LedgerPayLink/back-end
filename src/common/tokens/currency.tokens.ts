export type Chain = {
    chainId: number
    name: string
}

export type Token = {
    address: string
    symbol: string
}

export type Coin = {
    chainId: number
    symbol: string
}

export const CHAINS: Chain[] = [
    {chainId: 1, name: "ETHEREUM MAINNET"},
    {chainId: 56, name: "BINANCE SMART CHAIN MAINNET"},
    {chainId: 137, name: "POLYGON MAINNET"},
    {chainId: 3, name: "ROPSTEN"},
    {chainId: 4, name: "RINKEBY"},
    {chainId: 5, name: "GOERLI"},
    {chainId: 11155111, name: "SEPOLIA"},
    {chainId: 97, name: "BINANCE SMART CHAIN TESTNET"},
    {chainId: 80001, name: "MUMBAI"},
]

export const TOKENS: Token[] = [
    {address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", symbol: "DAI"},
    {address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", symbol: "USDC"},
    {address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", symbol: "USDT"}
]

export const COINS: Coin[] = [
    {chainId: 1, symbol: 'ETH'},
    {chainId: 56, symbol: 'BNB'},
    {chainId: 137, symbol: 'MATIC'},

    {chainId: 3, symbol: 'ETH'},
    {chainId: 4, symbol: 'ETH'},
    {chainId: 5, symbol: 'ETH'},
    {chainId: 11155111, symbol: 'ETH'},

    {chainId: 97, symbol: 'BNB'},
    {chainId: 80001, symbol: 'MATIC'},
]
