import {Contract, ethers} from 'ethers';
import abiJson from './priceFeed.json';
import { PriceFeed } from './price-feed';
import { NotFoundException } from '@nestjs/common';

const USD_FEED_ADDRESSES = [
  { symbol: 'ETH', address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419' },
  { symbol: 'DAI', address: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9' },
  { symbol: 'USDT', address: '0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46' },
  { symbol: 'USDC', address: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6' },
  { symbol: 'BNB', address: '0x14e613AC84a31f709eadbdF89C6CC390fDc9540A' },
  { symbol: 'MATIC', address: '0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676' },
];

function getPriceFeedContract(feedAddress: string): PriceFeed & Contract {
  return new Contract(
    feedAddress,
    abiJson,
    new ethers.providers.JsonRpcProvider(
      `https://mainnet.infura.io/v3/df99674aba224b7194774125b0712c95`,
    ),
  ) as PriceFeed & Contract;
}

export async function getTokenPriceInUSDCent(symbol: string) {
  const feedAddress = USD_FEED_ADDRESSES.find((feed) => feed.symbol == symbol);
  if (feedAddress === undefined)
    throw new NotFoundException('symbol feed not supported');
  return Number(
    BigInt(
      (await getPriceFeedContract(feedAddress.address).latestRoundData())
        .answer.toString(),
    ) / BigInt(10 ** 6),
  );
}
