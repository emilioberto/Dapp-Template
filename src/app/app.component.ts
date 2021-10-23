import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EthService } from 'src/app/core/services/eth.service';
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

  constructor(
    private web3Svc: Web3Service,
    private ethSvc: EthService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.web3Svc.loadWeb3();
    this.ethSvc.monitorAccountChanged();
    this.ethSvc.monitorChainChanged();

    this.ethSvc.onConnect(console.log);
    this.ethSvc.onDisconnect(console.log);

    const isConnected = this.ethSvc.isConnected();

  }

}
