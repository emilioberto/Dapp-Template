import {
  Injectable, NgZone,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const { ethereum } = window;

export interface ConnectInfo {
  chainId: string;
}

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

  onConnect(handler: (connectInfo: ConnectInfo) => void) {
    this.registerEvent('connect', handler);
  }

  onDisconnect(handler: (error: any) => void) { // TODO: Type ProviderRpcError
    this.registerEvent('connect', handler);
  }

  onAccountsChanged(handler: (accounts: string[]) => void) {
    this.registerEvent('accountsChanged', handler);
  }

  onChainChanged(handler: (chainId: number) => void) {
    this.registerEvent('chainChanged', handler);
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
