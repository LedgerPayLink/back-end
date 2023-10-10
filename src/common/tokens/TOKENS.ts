export type Token = {
  symbol: string;
  address: string;
  native: boolean;
};

export const MAINNET_TOKENS: Map<number, Token[]> = new Map()
  .set(1, [
    {
      symbol: 'DAI',
      native: false,
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    },
    {
      symbol: 'USDC',
      native: false,
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    },
    {
      symbol: 'USDT',
      native: false,
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    },
    { symbol: 'ETH', native: true, address: '' },
  ])
  .set(56, [
    {
      address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
      symbol: 'DAI',
      native: false,
    },
    {
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      symbol: 'USDC',
      native: false,
    },
    {
      address: '0x55d398326f99059fF775485246999027B3197955',
      symbol: 'USDT',
      native: false,
    },
    { address: '', symbol: 'BNB', native: true },
  ])
  .set(137, [
    {
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      symbol: 'DAI',
      native: false,
    },
    {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      symbol: 'USDC',
      native: false,
    },
    {
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      symbol: 'USDT',
      native: false,
    },
    { address: '', symbol: 'MATIC', native: true },
  ]);

export const TESTNET_TOKENS: Map<number, Token[]> = new Map()
  // .set(5, [
  //   {
  //     address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  //     symbol: 'UNI',
  //     native: false,
  //   },
  //   { address: '', symbol: 'ETH', native: true },
  // ])
  .set(11155111, [
    {
      address: '0xd6D6952Ba5dC8d93E6A480f7f1B52Cfd946B4b1F',
      symbol: 'ERC20TEST',
      native: false,
    },
    { address: '', symbol: 'ETH', native: true },
  ]);
// .set(97, [
//   {
//     address: '0x8d008B313C1d6C7fE2982F62d32Da7507cF43551',
//     symbol: 'CAKE',
//     native: false,
//   },
//   { address: '', symbol: 'BNB', native: true },
// ])
// .set(80001, [{ address: '', symbol: 'MATIC', native: true }])
