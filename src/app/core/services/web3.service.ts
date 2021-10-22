import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Web3 from 'web3';

const { ethereum } = window;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  _metamaskInstalled$ = new BehaviorSubject<boolean>(false);
  _chain$ = new BehaviorSubject<number | null>(null);
  _connectedAccount$ = new BehaviorSubject<string[] | null>(null);

  constructor(
    private ngZone: NgZone
  ) {
    this.registerOnAccountsChangedEvent();
    this.registerChainChangedEvent();
  }

  async loadWeb3(): Promise<boolean> {
    if (window.ethereum) {
      try {
        const accounts = await (window.ethereum.request({ method: 'eth_requestAccounts' }) as Promise<string[]>);
        this._metamaskInstalled$.next(true);
        this._connectedAccount$.next(accounts);
        window.web3 = new Web3(window.ethereum as any);
        return true;
      } catch (error) {
        this._metamaskInstalled$.next(false);
        return false;
      }
    }

    this._metamaskInstalled$.next(false);
    return false;
  }

  private registerOnAccountsChangedEvent(): void {
    ethereum.on('accountsChanged', (accounts) => {
      this.ngZone.run(() => this._connectedAccount$.next(accounts as string[]));
    });
  }

  private registerChainChangedEvent(): void {
    ethereum.on('chainChanged', chainId => {
      if (isNaN(chainId as number)) {
        throw new Error();
      }
      this.ngZone.run(() => this._chain$.next(chainId as number));
    });
  }
}
