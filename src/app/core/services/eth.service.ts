import {
  Injectable, NgZone,
} from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { map, take, tap } from 'rxjs/operators';

import { ConnectInfo, ProviderMessage, ProviderRpcError, RequestArguments } from 'src/app/shared/models/ethereum/ethereum.models';
import Web3 from 'web3';

const { ethereum } = window;

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
    return ethereum.isConnected();
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

  request(args: RequestArguments): Observable<unknown> {
    return from(ethereum.request(args))
      .pipe(take(1));
  }

  gasPrice(params: unknown[] = []): Observable<any> {
    const args: RequestArguments = { method: 'eth_gasPrice', params };
    return (this.request(args) as Observable<number>)
      .pipe(map(Web3.utils.toNumber));
  }

  requestAccounts(): Observable<string[]> {
    const args: RequestArguments = { method: 'eth_requestAccounts' };
    return (this.request(args) as Observable<string[]>);
  }

  accounts(): Observable<string[]> {
    const args: RequestArguments = { method: 'eth_accounts' };
    return (this.request(args) as Observable<string[]>);
  }

  getBalance(account: string): Observable<number> {
    const args: RequestArguments = { method: 'eth_getBalance', params: [account] };
    return (this.request(args) as Observable<number>);
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
    ethereum.on(eventName, handler);
  }
}
