import radspec from '@blossom-labs/rosette-radspec';
import { Transaction } from '@blossom-labs/rosette-radspec/dist/declarations/src/types/web3';
import { decode as decodeBytecode } from '@ethereum-sourcify/bytecode-utils';
import { Interface } from '@ethersproject/abi';
import { EthereumProvider } from 'ethereum-provider';

require('isomorphic-fetch');

export enum MetadataSources {
  Sourcify,
  BytecodeMetadata,
}

type GetMetadataOptions = {
  readonly source?: MetadataSources;
  readonly chainId?: number;
  readonly address?: string;
  readonly rpcProvider?: EthereumProvider;
  readonly ipfsProvider?: string;
  readonly sourcifyProvider?: string;
};

const defaultGetMetadataOptions: GetMetadataOptions = {
  source: MetadataSources.Sourcify,
  sourcifyProvider: 'https://repo.sourcify.dev',
  ipfsProvider: 'https://cloudflare-ipfs.com/',
};

export async function getMetadataFromAddress(options: GetMetadataOptions) {
  options = { ...defaultGetMetadataOptions, ...options };
  // eslint-disable-next-line functional/no-let
  let contractMetadataJSON;
  if (options.source === MetadataSources.Sourcify) {
    try {
      const req = await fetch(
        `${options.sourcifyProvider}/contracts/full_match/${options.chainId}/${options.address}/metadata.json`
      );
      contractMetadataJSON = await req.json();
    } catch (e) {
      console.log(e);
      return false;
    }
  } else if (options.source === MetadataSources.BytecodeMetadata) {
    const bytecode = (await options.rpcProvider.request({
      method: 'eth_getCode',
      params: [options.address, 'latest'],
    })) as string;
    if (!bytecode) {
      return false;
    }
    const { ipfs: metadataIpfsCid } = decodeBytecode(bytecode);
    try {
      const req = await fetch(
        `${options.ipfsProvider}/ipfs/${metadataIpfsCid}`
      );
      contractMetadataJSON = await req.json();
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  return contractMetadataJSON;
}

export const evaluate = async function name(
  expression: string,
  abi,
  transaction: Transaction,
  provider?
): Promise<string> {
  return await radspec(expression, abi, transaction, provider);
};

export const findSelectorAndAbiItemFromSignatureHash = (
  functionSignatureHash,
  abi
) => {
  const interf = new Interface(abi);
  const selector = Object.keys(interf.functions).find((selector) => {
    return interf.getSighash(selector) === functionSignatureHash;
  });
  // TODO: handle error
  return {
    selector,
    abi: interf.functions[selector],
  };
};

export const evaluateCallDataFromTx = async (
  tx: Transaction,
  options: GetMetadataOptions = {}
): Promise<string> => {
  const getMetadataOptions = {
    ...defaultGetMetadataOptions,
    ...options,
    address: tx.to,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chainId: options.chainId || (tx as any).chainId,
  };
  const metadata = await getMetadataFromAddress(getMetadataOptions);

  const functionSignatureHash = tx.data.slice(0, 10);

  const { selector } = findSelectorAndAbiItemFromSignatureHash(
    functionSignatureHash,
    metadata.output.abi
  );

  const evaluatedString = await evaluate(
    metadata.output.userdoc.methods[selector].notice,
    metadata.output.abi,
    tx,
    getMetadataOptions.rpcProvider
  );
  return evaluatedString;
};