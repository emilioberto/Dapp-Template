import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Web3 from 'web3';

const { web3, ethereum } = window;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  _metamaskInstalled$ = new BehaviorSubject<boolean>(false);
  _connectedAccount$ = new BehaviorSubject<string[] | null>(null);

  constructor() { }

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

  test(): void {
    ethereum.on('accountsChanged', (accounts) => {
      this._connectedAccount$.next(accounts as string[]);
    });
  }

}
