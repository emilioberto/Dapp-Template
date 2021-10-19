import { Component, OnInit } from '@angular/core';
import { Web3Service } from './core/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'dapp-template';
  metamaskInstalled$ = this.web3Svc.metamaskInstalled$;

  constructor(
    private web3Svc: Web3Service
  ) { }

  async ngOnInit(): Promise<void> {
    await this.web3Svc.loadWeb3();
  }

}
