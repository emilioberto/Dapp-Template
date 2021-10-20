import { InjectionToken } from "@angular/core";
import { Eth } from 'web3-eth';

export const ETH = new InjectionToken<Eth>('Eth');
