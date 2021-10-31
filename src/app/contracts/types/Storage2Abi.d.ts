/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface Storage2AbiInterface extends ethers.utils.Interface {
  functions: {
    "retrieve()": FunctionFragment;
    "store(uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "retrieve", values?: undefined): string;
  encodeFunctionData(functionFragment: "store", values: [BigNumberish]): string;

  decodeFunctionResult(functionFragment: "retrieve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "store", data: BytesLike): Result;

  events: {
    "Store(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Store"): EventFragment;
}

export type StoreEvent = TypedEvent<
  [string, BigNumber] & { _from: string; _value: BigNumber }
>;

export class Storage2Abi extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: Storage2AbiInterface;

  functions: {
    retrieve(overrides?: CallOverrides): Promise<[BigNumber]>;

    store(
      num: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  retrieve(overrides?: CallOverrides): Promise<BigNumber>;

  store(
    num: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    retrieve(overrides?: CallOverrides): Promise<BigNumber>;

    store(num: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Store(address,uint256)"(
      _from?: string | null,
      _value?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { _from: string; _value: BigNumber }
    >;

    Store(
      _from?: string | null,
      _value?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { _from: string; _value: BigNumber }
    >;
  };

  estimateGas: {
    retrieve(overrides?: CallOverrides): Promise<BigNumber>;

    store(
      num: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    retrieve(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    store(
      num: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
