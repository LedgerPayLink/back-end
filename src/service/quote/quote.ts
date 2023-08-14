import {CURRENCY, Token, TOKEN_ADDRESS, tokens} from "../../domain/constants";
import axios from "axios";
import dotenv from "dotenv";
import {Contract, JsonRpcProvider} from "ethers";
import feedAbi from './feedAbi.json';
import {FeedContract} from "./types/feed-contract";

dotenv.config();
const api_key = process.env.API_KEY;


export async function convertToUSD(currencyFrom: CURRENCY, amountInCentsFrom: number) {
    const response = await axios.get(
        `https://api.currencybeacon.com/v1/convert?api_key=${api_key}&from=${currencyFrom}&to=USD&amount=${amountInCentsFrom}`
    );
    return response.data.response.value as number;
}

export async function USDToToken(amountInCents: number, tokenAddress: TOKEN_ADDRESS) {
    const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/df99674aba224b7194774125b0712c95")
    const feedAddress = (tokens.find(t => t.tokenAddress == tokenAddress) as Token).feedUSDAddress
    const feedContract: FeedContract = new Contract(feedAddress, feedAbi, provider) as FeedContract

    return (Number((await feedContract.latestRoundData()).answer) / 10**10) * amountInCents
}
