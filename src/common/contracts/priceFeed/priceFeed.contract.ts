import {Contract, JsonRpcProvider} from "ethers";
import abiJson from './priceFeed.json'
import {PriceFeed} from "./price-feed";

const address = "0x694AA1769357215DE4FAC081bf1f309aDC325306"

export default function getPriceFeedContract(): PriceFeed & Contract {
    return new Contract(address, abiJson, new JsonRpcProvider(`https://sepolia.infura.io/v3/df99674aba224b7194774125b0712c95`)) as PriceFeed & Contract
}

export async function getETHPriceInUSD() {
    return (await getPriceFeedContract().latestRoundData()).answer as number
}
