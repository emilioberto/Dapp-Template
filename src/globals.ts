import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from "web3";

export { }

declare global {
  interface Window {
    web3: Web3;
    ethereum: MetaMaskInpageProvider; // TODO: Generate types for this if possible
  }
}
