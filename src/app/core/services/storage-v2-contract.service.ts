import { Injectable } from '@angular/core';
import { Storage2Abi } from 'src/app/contracts/types';

import Abi from '../../contracts/storage2.abi.json';
import { Web3Service } from './web3.service';
import { Contract, BigNumber, ContractTransaction } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class StorageV2ContractService {

  private contractAddress = '0xE9f31D1ea6451630e0a07D58C053908a4aF4fe25';
  private contract!: Storage2Abi;

  constructor() { }

  async createContract(): Promise<void> {
    if (this.contract !== null && this.contract !== undefined) {
      return;
    }
    const signer = Web3Service.provider.getSigner(0);
    this.contract = new Contract(this.contractAddress, Abi, signer) as Storage2Abi;
  }

  readStoredValue(): Promise<BigNumber> {
    this.contract.callStatic.retrieve
    return this.contract.retrieve();
  }

  async writeValue(value: number): Promise<ContractTransaction> {
    const [account] = await Web3Service.provider.listAccounts();
    const gasPrice = await Web3Service.provider.getGasPrice();

    return await this.contract.store(value, { from: account, gasPrice });
  }


  monitorValueStoredChanged(): void {
    const storeEventFilter = this.contract.filters.Store();
    this.contract.on(storeEventFilter, (address, number) => {
      console.log(`Address ${address} stored number ${number.toString()}`);
    });
  }

}
