import {Contract, JsonRpcProvider, Provider} from "ethers";
import abiJson from './erc20.json'
import {Erc20} from "./erc20";

const providers = [
    {chainId: 3, providerUrl: "https://sepolia.infura.io/v3/df99674aba224b7194774125b0712c95"},
    {chainId: 3, providerUrl: "https://sepolia.infura.io/v3/df99674aba224b7194774125b0712c95"}
]

export default function getLedgerPayLinkContract(tokenAddress: string, provider: Provider): Erc20 & Contract {
    // return new Contract(tokenAddress, abiJson, new JsonRpcProvider(`https://sepolia.infura.io/v3/df99674aba224b7194774125b0712c95`)) as Erc20 & Contract
    return new Contract(tokenAddress, abiJson, provider) as Erc20 & Contract
}
