import Web3 from "web3";

export { }

declare global {
  interface Window {
    web3: Web3;
    ethereum: any; // TODO: Generate types for this if possible
  }
}
