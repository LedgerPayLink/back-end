import {Contract, providers} from "ethers";
import abiJson from './erc20.json'
import {Erc20} from "./erc20";
import {urls} from "../../providers";

export default function getErc20Contract(tokenAddress: string, chainId: number): Erc20 & Contract {
    const url = urls.get(chainId);
    return new Contract(tokenAddress, abiJson, new providers.JsonRpcProvider(url)) as Erc20 & Contract
}
