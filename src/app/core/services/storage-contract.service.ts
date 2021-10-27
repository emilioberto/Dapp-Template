import { Injectable } from '@angular/core';
import { BaseContract } from 'src/app/contracts/types';

import Abi from '../../contracts/storage.abi.json';
import { Storage as StorageContract } from '../../contracts/storage';
import { Web3Service } from './web3.service';
import { ethers, Contract } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class StorageContractService {

  private contractAddress = '0xB80da2017366B5Bc8b378ab73E15fB1809682c42';
  private contract!: Contract;

  constructor() { }

  async createContract(): Promise<void> {
    if (this.contract !== null && this.contract !== undefined) {
      return;
    }

    this.contract = new Contract(this.contractAddress, Abi);
  }

  readStoredValue(): Promise<string> {
    return this.contract.retrieve();
  }

  async writeValue(value: number): Promise<any> { // TODO: Type TransactionReceipt
    const [account] = await Web3Service.provider.listAccounts();
    const gasPrice = await Web3Service.provider.getGasPrice();

    return await this.contract.store(value).send({ from: account, gasPrice });
  }




}
