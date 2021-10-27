import {
  Injectable, NgZone,
} from '@angular/core';
import { BigNumber } from 'ethers';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { map, take } from 'rxjs/operators';

import { ConnectInfo, ProviderMessage, ProviderRpcError } from 'src/app/shared/models/ethereum/ethereum.models';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root',
})
export class EthService {

  private _metamaskInstalled$ = new BehaviorSubject<boolean>(false);
  private _chain$ = new BehaviorSubject<number | null>(null);
  private _connectedAccount$ = new BehaviorSubject<string[] | null>(null);

  // Observables
  metamaskInstalled$ = this._metamaskInstalled$.asObservable();
  chain$ = this._chain$.asObservable();
  connectedAccount$ = this._connectedAccount$.asObservable();

  constructor(
    private ngZone: NgZone,
  ) { }

  isConnected(): boolean {
    return window.ethereum.isConnected();
  }

  // Ethereum Events

  onConnect(handler: (connectInfo: ConnectInfo) => void): void {
    this.registerEvent('connect', handler);
  }

  onDisconnect(handler: (error: ProviderRpcError) => void): void {
    this.registerEvent('connect', handler);
  }

  onAccountsChanged(handler: (accounts: string[]) => void): void {
    this.registerEvent('accountsChanged', handler);
  }

  onChainChanged(handler: (chainId: number) => void): void {
    this.registerEvent('chainChanged', handler);
  }

  onMessage(handler: (message: ProviderMessage) => void): void {
    this.registerEvent('message', handler);
  }

  // Ethereum methods

  request(method: string, params: any[] = []): Observable<unknown> {
    return from(Web3Service.provider.prepareRequest(method, params))
      .pipe(take(1));
  }

  gasPrice(params: any[] = []): Observable<any> {
    return (this.request('eth_gasPrice', params) as Observable<BigNumber>)
      .pipe(map(gasPrice => gasPrice.toNumber()));
  }

  requestAccounts(): Observable<string[]> {
    return (this.request('eth_requestAccounts') as Observable<string[]>);
  }

  accounts(): Observable<string[]> {
    return (this.request('eth_accounts') as Observable<string[]>);
  }

  getBalance(account: string): Observable<number> {
    return (this.request('eth_getBalance', [account]) as Observable<number>);
  }

  monitorAccountChanged(): void {
    this.registerEvent(
      'accountsChanged',
      (accounts: string[]) => this._connectedAccount$.next(accounts)
    );
  }

  monitorChainChanged(): void {
    this.registerEvent(
      'chainChanged',
      chainId => {
        if (isNaN(chainId as number)) {
          throw new Error();
        }
        this.ngZone.run(() => this._chain$.next(chainId as number));
      }
    );
  }

  // Utils

  private registerEvent(eventName: string, handler: (...args: any) => void): void {
    Web3Service.provider.on(eventName, handler);
  }
}
