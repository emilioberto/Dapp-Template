// import {
//   Inject,
//   Injectable,
// } from '@angular/core';
// import { ETH } from '../tokens/eth.token';
// import { Eth } from 'web3-eth';

// @Injectable({
//   providedIn: 'root',
// })
// export class EthService {

//   constructor(@Inject(ETH) private eth: Eth) { }

//   async requestAccounts(): Promise<string | null> {
//     try {
//       const account = await this.eth.requestAccounts()
//       return account[0];
//     } catch (error) {
//       return null;
//     }
//   }
// }
