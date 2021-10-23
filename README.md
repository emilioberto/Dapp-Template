# DappTemplate

To fix this error: `./node_modules/cipher-base/index.js:2:16-43 - Error: Module not found: Error: Can't resolve 'stream'`

https://stackoverflow.com/questions/66749738/angular-web3-js-module-not-found-error-cant-resolve-crypto

- npm install crypto-browserify stream-browserify assert stream-http https-browserify os-browserify
- in tsconfig.json 
```{
  "compilerOptions": {
    "paths" : {
      "crypto": ["./node_modules/crypto-browserify"],
      "stream": ["./node_modules/stream-browserify"],
      "assert": ["./node_modules/assert"],
      "http": ["./node_modules/stream-http"],
      "https": ["./node_modules/https-browserify"],
      "os": ["./node_modules/os-browserify"],
    }
  }
}
```


To create types for Contract:

```
npx typechain --out-dir src/app/contracts --target web3-v1 
```
