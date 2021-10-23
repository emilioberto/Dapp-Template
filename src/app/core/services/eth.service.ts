import {
  Injectable, NgZone,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConnectInfo, ProviderMessage, ProviderRpcError, RequestArguments } from 'src/app/shared/models/ethereum/ethereum.models';

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

  request(args: RequestArguments): Promise<unknown> {
    return ethereum.request(args);
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
