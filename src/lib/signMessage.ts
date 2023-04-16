import { ethers } from 'ethers';
import { getAlchemyApiKey, getPk } from './setttings';

export async function signTypedData(
  domain: any,
  types: any,
  message: any
): Promise<string> {
  if (getPk() === '') {
    throw new Error('PK is not set!');
  }

  if (getAlchemyApiKey() === '') {
    throw new Error('API key is not set!');
  }

  const provider = ethers.getDefaultProvider('homestead', {
    alchemy: getAlchemyApiKey(),
  });
  const signer = new ethers.Wallet(getPk(), provider);
  const signature = await signer.signTypedData(domain, types, message);
  return signature;
}
