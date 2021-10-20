import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private _metamaskInstalled$ = new BehaviorSubject<boolean>(false);

  metamaskInstalled$ = this._metamaskInstalled$.asObservable();

  constructor() { }

  async loadWeb3(): Promise<void> {
    if (typeof window.web3 !== 'undefined') {
      window.web3 = new Web3(window.web3.currentProvider);
      this._metamaskInstalled$.next(true);
      console.log(await window.ethereum.request({ method: 'eth_requestAccounts' }));

      // Handle user reject!
    } else {
      this._metamaskInstalled$.next(false);
    }
  }
}
