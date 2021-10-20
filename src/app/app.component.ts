import { Component, OnInit } from '@angular/core';
import { Web3Service } from './core/services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  metamaskInstalled$ = this.web3Svc._metamaskInstalled$;
  connectedAccount$ = this.web3Svc._connectedAccount$;

  constructor(
    private web3Svc: Web3Service,
  ) { }

  async ngOnInit(): Promise<void> {
    this.connectedAccount$.subscribe(console.log);

    await this.web3Svc.loadWeb3();
    this.web3Svc.test();
  }

  test(): void {
    console.log('test');
  }
}
