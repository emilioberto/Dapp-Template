import {
  Injectable, NgZone,
} from '@angular/core';
import { BigNumber } from 'ethers';
import { Network } from '@ethersproject/networks';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { map, take } from 'rxjs/operators';

import { ConnectInfo, ProviderMessage, ProviderRpcError } from 'src/app/shared/models/ethereum/ethereum.models';
import { Web3Service } from './web3.service';
import { ethers } from "ethers";


@Injectable({
  providedIn: 'root',
})
export class EthService {

  private _network$ = new BehaviorSubject<number | null>(null);
  private _connectedAccount$ = new BehaviorSubject<string[] | null>(null);

  // Observables
  network$ = this._network$.asObservable();
  connectedAccount$ = this._connectedAccount$.asObservable();

  constructor(
    private ngZone: NgZone,
  ) { }

  isConnected(): boolean {
    return window.ethereum.isConnected();
  }

  getNetwork(): Promise<Network> {
    return Web3Service.provider.getNetwork();
  }

  async getAccounts(): Promise<string[]> {
    const accounts = await Web3Service.provider.listAccounts();
    this._connectedAccount$.next(accounts);
    return accounts;
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
      (accounts: string[]) => {
        console.log(accounts);
        this._connectedAccount$.next(accounts);
      }
    );
  }

  monitorNetworkChanged(): void {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        alert('network changed');
        window.location.reload();
      }
    });
  }

  // Utils

  private registerEvent(eventName: string, handler: (...args: any) => void): void {
    window.ethereum.on(eventName, handler);
  }
}
