import {
  ContractTransaction,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  LegerPayLink,
  LegerPayLinkMethodNames,
  LegerPayLinkEventsContext,
  LegerPayLinkEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumberish | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumberish | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type LegerPayLinkEvents = undefined;
export interface LegerPayLinkEventsContext {}
export type LegerPayLinkMethodNames =
  | 'new'
  | 'LPLAddress'
  | 'WETH'
  | 'feePer1000'
  | 'payWithETH'
  | 'payWithToken'
  | 'swapRouter';
export interface LegerPayLink {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _LPLAddress Type: address, Indexed: false
   */
  'new'(
    _LPLAddress: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  LPLAddress(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  WETH(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feePer1000(overrides?: ContractCallOverrides): Promise<BigNumberish>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   * @param destination Type: address, Indexed: false
   */
  payWithETH(
    amount: BigNumberish,
    destination: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenAddress Type: address, Indexed: false
   * @param tokenAmount Type: uint256, Indexed: false
   * @param destination Type: address, Indexed: false
   */
  payWithToken(
    tokenAddress: string,
    tokenAmount: BigNumberish,
    destination: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  swapRouter(overrides?: ContractCallOverrides): Promise<string>;
}
