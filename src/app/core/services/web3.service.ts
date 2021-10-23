import { Injectable, NgZone } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  constructor(
    private ngZone: NgZone
  ) { }

  async loadWeb3(): Promise<boolean> {
    if (window.ethereum) {
      try {
        const accounts = await (window.ethereum.request({ method: 'eth_requestAccounts' }) as Promise<string[]>);
        // this._metamaskInstalled$.next(true);
        // this._connectedAccount$.next(accounts);
        window.web3 = new Web3(window.ethereum as any);
        return true;
      } catch (error) {
        // this._metamaskInstalled$.next(false);
        return false;
      }
    }

    // this._metamaskInstalled$.next(false);
    return false;
  }

}
