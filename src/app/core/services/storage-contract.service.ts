import { Injectable } from '@angular/core';
import { StorageAbi } from 'src/app/contracts/types';

import Abi from '../../contracts/storage.abi.json';
import { Web3Service } from './web3.service';
import { Contract, BigNumber, ContractTransaction } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class StorageContractService {

  private contractAddress = '0xB80da2017366B5Bc8b378ab73E15fB1809682c42';
  private contract!: StorageAbi;

  constructor() { }

  async createContract(): Promise<void> {
    if (this.contract !== null && this.contract !== undefined) {
      return;
    }
    const signer = Web3Service.provider.getSigner(0);
    this.contract = new Contract(this.contractAddress, Abi, signer) as StorageAbi;
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

}
