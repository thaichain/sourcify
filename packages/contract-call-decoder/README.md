# contract-call-decoder

Parse the `notice` field (from the metadata's userdoc) given a contract call transaction.

> Right now the contract-call-decoder uses `@blossom-labs/rosette-radspec` to interpret the notice, but it's experimental. This feature will change in the future.

## Install

```
yarn add @ethereum-sourcify/contract-call-decoder
```

## Usage

First import the library and have a transaction (ethers and web3 transaction artifacts are compatible)

```ts
import { evaluateCallDataFromTx } from '@ethereum-sourcify/contract-call-decoder';

const tx = {
  to: '0xD4B081C226Bc8aBdaf111DEf54c09E779ad29428',
  data: '0xcea299370000000000000000000000000000000000000000000000000000000000000002',
};
```

### Get the notice using metadata taken from Sourcify

```ts
const notice = await evaluateCallDataFromTx(tx, { chainId: 5 }); // Set the new value 4
```

### Get the notice using metadata taken from blockchain

```ts
const notice = await evaluateCallDataFromTx(tx, {
  source: MetadataSources.BytecodeMetadata,
  rpcProvider: ethereumProvider,
  chainId: 5,
}); // Set the new value 4
```