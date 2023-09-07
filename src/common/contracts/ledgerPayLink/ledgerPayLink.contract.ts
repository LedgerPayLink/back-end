import {Contract, JsonRpcProvider} from "ethers";
import abiJson from './ledgerPayLink.json'
import {LegerPayLink} from "./leger-pay-link";

const address = "0xEcCA63A924700735b382b0B6c02E9c9Ff4e4a474"

export default function getLedgerPayLinkContract(): LegerPayLink & Contract {
    return new Contract(address, abiJson, new JsonRpcProvider(`https://sepolia.infura.io/v3/df99674aba224b7194774125b0712c95`)) as LegerPayLink & Contract
}
