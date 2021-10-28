import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EthService } from 'src/app/core/services/eth.service';
import { StorageContractService } from './core/services/storage-contract.service';
import { Web3Service } from './core/services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  metamaskInstalled$ = this.ethSvc.metamaskInstalled$;
  connectedAccount$ = this.ethSvc.connectedAccount$;
  chain$ = this.ethSvc.chain$;

  storedValue!: number;

  constructor(
    private ethSvc: EthService,
    private storageContractSvc: StorageContractService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    await Web3Service.loadWeb3();
    this.ethSvc.monitorAccountChanged();
    this.ethSvc.monitorChainChanged();

    this.ethSvc.onConnect(console.log);
    this.ethSvc.onDisconnect(console.log);

    const isConnected = this.ethSvc.isConnected();
    // this.ethSvc.gasPrice().subscribe(console.log);
    // this.ethSvc.requestAccounts().subscribe(console.log);
    // this.ethSvc.accounts().subscribe(console.log);
    // this.ethSvc.accounts()
    //   .pipe(
    //     switchMap(accounts => this.ethSvc.getBalance(accounts[0]))
    //   )
    //   .subscribe(console.log);

    await this.storageContractSvc.createContract();
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
