import {
    ContractTransaction,
    BigNumberish,
} from 'ethers';
import {EthersContractContextV5} from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
    PriceFeed,
    PriceFeedMethodNames,
    PriceFeedEventsContext,
    PriceFeedEvents
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

export type PriceFeedEvents =
    | 'AnswerUpdated'
    | 'NewRound'
    | 'OwnershipTransferRequested'
    | 'OwnershipTransferred';

export interface PriceFeedEventsContext {
    AnswerUpdated(...parameters: any): EventFilter;

    NewRound(...parameters: any): EventFilter;

    OwnershipTransferRequested(...parameters: any): EventFilter;

    OwnershipTransferred(...parameters: any): EventFilter;
}

export type PriceFeedMethodNames =
    | 'new'
    | 'acceptOwnership'
    | 'accessController'
    | 'aggregator'
    | 'confirmAggregator'
    | 'decimals'
    | 'description'
    | 'getAnswer'
    | 'getRoundData'
    | 'getTimestamp'
    | 'latestAnswer'
    | 'latestRound'
    | 'latestRoundData'
    | 'latestTimestamp'
    | 'owner'
    | 'phaseAggregators'
    | 'phaseId'
    | 'proposeAggregator'
    | 'proposedAggregator'
    | 'proposedGetRoundData'
    | 'proposedLatestRoundData'
    | 'setController'
    | 'transferOwnership'
    | 'version';

export interface AnswerUpdatedEventEmittedResponse {
    current: BigNumberish;
    roundId: BigNumberish;
    updatedAt: BigNumberish;
}

export interface NewRoundEventEmittedResponse {
    roundId: BigNumberish;
    startedBy: string;
    startedAt: BigNumberish;
}

export interface OwnershipTransferRequestedEventEmittedResponse {
    from: string;
    to: string;
}

export interface OwnershipTransferredEventEmittedResponse {
    from: string;
    to: string;
}

export interface GetRoundDataResponse {
    roundId: BigNumberish;
    0: BigNumberish;
    answer: BigNumberish;
    1: BigNumberish;
    startedAt: BigNumberish;
    2: BigNumberish;
    updatedAt: BigNumberish;
    3: BigNumberish;
    answeredInRound: BigNumberish;
    4: BigNumberish;
    length: 5;
}

export interface LatestRoundDataResponse {
    roundId: BigNumberish;
    0: BigNumberish;
    answer: BigNumberish;
    1: BigNumberish;
    startedAt: BigNumberish;
    2: BigNumberish;
    updatedAt: BigNumberish;
    3: BigNumberish;
    answeredInRound: BigNumberish;
    4: BigNumberish;
    length: 5;
}

export interface ProposedGetRoundDataResponse {
    roundId: BigNumberish;
    0: BigNumberish;
    answer: BigNumberish;
    1: BigNumberish;
    startedAt: BigNumberish;
    2: BigNumberish;
    updatedAt: BigNumberish;
    3: BigNumberish;
    answeredInRound: BigNumberish;
    4: BigNumberish;
    length: 5;
}

export interface ProposedLatestRoundDataResponse {
    roundId: BigNumberish;
    0: BigNumberish;
    answer: BigNumberish;
    1: BigNumberish;
    startedAt: BigNumberish;
    2: BigNumberish;
    updatedAt: BigNumberish;
    3: BigNumberish;
    answeredInRound: BigNumberish;
    4: BigNumberish;
    length: 5;
}

export interface PriceFeed {
    /**
     * Payable: false
     * Constant: false
     * StateMutability: nonpayable
     * Type: constructor
     * @param _aggregator Type: address, Indexed: false
     * @param _accessController Type: address, Indexed: false
     */
    'new'(
        _aggregator: string,
        _accessController: string,
        overrides?: ContractTransactionOverrides,
    ): Promise<ContractTransaction>;

    /**
     * Payable: false
     * Constant: false
     * StateMutability: nonpayable
     * Type: function
     */
    acceptOwnership(
        overrides?: ContractTransactionOverrides,
    ): Promise<ContractTransaction>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    accessController(overrides?: ContractCallOverrides): Promise<string>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    aggregator(overrides?: ContractCallOverrides): Promise<string>;

    /**
     * Payable: false
     * Constant: false
     * StateMutability: nonpayable
     * Type: function
     * @param _aggregator Type: address, Indexed: false
     */
    confirmAggregator(
        _aggregator: string,
        overrides?: ContractTransactionOverrides,
    ): Promise<ContractTransaction>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    decimals(overrides?: ContractCallOverrides): Promise<number>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    description(overrides?: ContractCallOverrides): Promise<string>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param _roundId Type: uint256, Indexed: false
     */
    getAnswer(
        _roundId: BigNumberish,
        overrides?: ContractCallOverrides,
    ): Promise<BigNumberish>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param _roundId Type: uint80, Indexed: false
     */
    getRoundData(
        _roundId: BigNumberish,
        overrides?: ContractCallOverrides,
    ): Promise<GetRoundDataResponse>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param _roundId Type: uint256, Indexed: false
     */
    getTimestamp(
        _roundId: BigNumberish,
        overrides?: ContractCallOverrides,
    ): Promise<BigNumberish>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    latestAnswer(overrides?: ContractCallOverrides): Promise<BigNumberish>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    latestRound(overrides?: ContractCallOverrides): Promise<BigNumberish>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    latestRoundData(
        overrides?: ContractCallOverrides,
    ): Promise<LatestRoundDataResponse>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    latestTimestamp(overrides?: ContractCallOverrides): Promise<BigNumberish>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    owner(overrides?: ContractCallOverrides): Promise<string>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param parameter0 Type: uint16, Indexed: false
     */
    phaseAggregators(
        parameter0: BigNumberish,
        overrides?: ContractCallOverrides,
    ): Promise<string>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    phaseId(overrides?: ContractCallOverrides): Promise<number>;

    /**
     * Payable: false
     * Constant: false
     * StateMutability: nonpayable
     * Type: function
     * @param _aggregator Type: address, Indexed: false
     */
    proposeAggregator(
        _aggregator: string,
        overrides?: ContractTransactionOverrides,
    ): Promise<ContractTransaction>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    proposedAggregator(overrides?: ContractCallOverrides): Promise<string>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     * @param _roundId Type: uint80, Indexed: false
     */
    proposedGetRoundData(
        _roundId: BigNumberish,
        overrides?: ContractCallOverrides,
    ): Promise<ProposedGetRoundDataResponse>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    proposedLatestRoundData(
        overrides?: ContractCallOverrides,
    ): Promise<ProposedLatestRoundDataResponse>;

    /**
     * Payable: false
     * Constant: false
     * StateMutability: nonpayable
     * Type: function
     * @param _accessController Type: address, Indexed: false
     */
    setController(
        _accessController: string,
        overrides?: ContractTransactionOverrides,
    ): Promise<ContractTransaction>;

    /**
     * Payable: false
     * Constant: false
     * StateMutability: nonpayable
     * Type: function
     * @param _to Type: address, Indexed: false
     */
    transferOwnership(
        _to: string,
        overrides?: ContractTransactionOverrides,
    ): Promise<ContractTransaction>;

    /**
     * Payable: false
     * Constant: true
     * StateMutability: view
     * Type: function
     */
    version(overrides?: ContractCallOverrides): Promise<BigNumberish>;
}
