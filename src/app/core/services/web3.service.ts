import { Injectable } from '@angular/core';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import { ethers } from "ethers";

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  public static provider: Web3Provider;

  constructor() { }

  static async loadWeb3(): Promise<boolean> {
    if (window.ethereum) {
      try {
        await (window.ethereum.request!({ method: 'eth_requestAccounts' }) as Promise<string[]>);
        this.provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ExternalProvider)
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }

}
