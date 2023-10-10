export type Chain = {
  chainId: number;
  name: string;
};

export const MAINNET_CHAINS: Chain[] = [
  { chainId: 1, name: 'ETHEREUM MAINNET' },
  { chainId: 56, name: 'BINANCE SMART CHAIN MAINNET' },
  { chainId: 137, name: 'POLYGON MAINNET' },
];

export const TESTNET_CHAINS: Chain[] = [
  // {chainId: 3, name: "ROPSTEN"},
  // {chainId: 4, name: "RINKEBY"},
  // { chainId: 5, name: 'GOERLI' },
  { chainId: 11155111, name: 'SEPOLIA' },
  // { chainId: 97, name: 'BINANCE SMART CHAIN TESTNET' },
  // { chainId: 80001, name: 'MUMBAI' },
];
