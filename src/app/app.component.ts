import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EthService } from 'src/app/core/services/eth.service';
import { StorageContractService } from './core/services/storage-contract.service';
import { Web3Service } from './core/services/web3.service';
import { Network } from '@ethersproject/networks';
import { StorageV2ContractService } from './core/services/storage-v2-contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  connectedAccount$ = this.ethSvc.connectedAccount$;

  network!: Network;
  storedValue!: number;

  constructor(
    private ethSvc: EthService,
    private storageContractSvc: StorageV2ContractService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    await Web3Service.loadWeb3();

    this.network = await this.ethSvc.getNetwork();
    await this.ethSvc.getAccounts();
    this.cdr.detectChanges();

    this.ethSvc.monitorAccountChanged();
    this.ethSvc.monitorNetworkChanged();

    await this.storageContractSvc.createContract();
    this.storageContractSvc.monitorValueStoredChanged();
  }

  async readValue(): Promise<void> {
    const result = await this.storageContractSvc.readStoredValue();
    this.storedValue = +result;
    this.cdr.detectChanges();
  }

  async writeValue(value: number): Promise<void> {
    const transaction = await this.storageContractSvc.writeValue(value);
    const receipt = await transaction.wait();
    console.log(receipt);
    await this.readValue();
  }

}
