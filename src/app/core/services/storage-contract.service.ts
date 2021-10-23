import { Injectable } from '@angular/core';
import { BaseContract } from 'src/app/contracts/types';

import Abi from '../../contracts/storage.abi.json';
import { Storage as StorageContract } from '../../contracts/storage';
import { AbiItem } from 'web3-utils';
import { TransactionReceipt } from 'web3-core';

@Injectable({
  providedIn: 'root'
})
export class StorageContractService {

  private contractAddress = '0xB80da2017366B5Bc8b378ab73E15fB1809682c42';
  private contract!: StorageContract;

  constructor() { }

  async createContract(): Promise<void> {
    if (this.contract !== null && this.contract !== undefined) {
      return;
    }

    this.contract = new window.web3.eth.Contract(Abi as AbiItem[], this.contractAddress) as BaseContract as StorageContract;
  }

  readStoredValue(): Promise<string> {
    return this.contract.methods.retrieve().call();
  }

  async writeValue(value: number): Promise<TransactionReceipt> {
    const [account] = await window.web3.eth.getAccounts();
    const gasPrice = await window.web3.eth.getGasPrice();

    return await this.contract.methods.store(value).send({ from: account, gasPrice });
  }




}
