import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Web3Service } from './core/services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  metamaskInstalled$ = this.web3Svc._metamaskInstalled$;
  connectedAccount$ = this.web3Svc._connectedAccount$;
  chain$ = this.web3Svc._chain$;

  constructor(
    private web3Svc: Web3Service,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.web3Svc.loadWeb3();
  }

}
