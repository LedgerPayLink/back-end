export enum CURRENCY {
    USD = "USD",
    EUR =  "EUR",
    GBP =  "GBP"
}

export enum TOKEN_ADDRESS {
    ADA = "ADA"
}

export interface Token {
    tokenAddress: string;
    feedUSDAddress: string
}

export const tokens: Token[] = [
    {tokenAddress: TOKEN_ADDRESS.ADA, feedUSDAddress: "0xAE48c91dF1fE419994FFDa27da09D5aC69c30f55"}
]




