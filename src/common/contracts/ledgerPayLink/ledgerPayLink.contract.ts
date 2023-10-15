import {Contract, ethers} from "ethers";
import abiJson from './ledgerPayLink.json'
import {LedgerPayLink} from "./leger-pay-link";
import {urls} from "../../providers";

const deployedLedgerPayLinkAddresses: Map<number, string> = new Map()
    .set(11155111, "0x513352dB26a38D5894aAE3d47C7C248a6677d1eD")
    .set(5, "0xeF19006A94C5612FE1dFD47428a71076B8bCeB21")

export default function getLedgerPayLinkContract(chainId: number): LedgerPayLink & Contract {
    const ledgerPayLinkAddress = deployedLedgerPayLinkAddresses.get(chainId);
    const url = urls.get(chainId);
    return new Contract(ledgerPayLinkAddress, abiJson, new ethers.providers.JsonRpcProvider(url)) as LedgerPayLink & Contract
}
