import axios from 'axios';
import getNextYearISODate from '@/lib/getNextYearISODate';
import { signTypedData } from '@/lib/signMessage';

interface ISignData {
  root: string;
  trader: string;
  side: number;
  matchingPolicy: string;
  collection: string;
  tokenId: string;
  amount: string;
  paymentToken: string;
  price: string;
  listingTime: number;
  expirationTime: number;
  fees: [];
  salt: string;
  extraParams: string;
  nonce: string;
}

export async function makeBid(
  contract: string,
  value: number,
  qty: number
): Promise<boolean> {
  try {
    const response = await axios.post(
      'https://core-api.prod.blur.io/v1/collection-bids/format',
      {
        contractAddress: contract,
        expirationTime: getNextYearISODate(),
        price: {
          unit: 'BETH',
          amount: value.toString(),
        },
        quantity: qty,
      },
      {
        headers: {
          'content-Type': 'application/json',
          Accept: '/',
          'Cache-Control': 'no-cache',
          Cookie: document.cookie,
        },
      }
    );

    const data = response.data;

    if (data.success === true) {
      const signData = data.signatures[0].signData;
      const signature = await signTypedData(
        signData.domain,
        signData.types,
        getMessageToSign(data.signatures[0].signData.value)
      );

      const success = await submitBid(
        data.signatures[0].marketplaceData,
        signature
      );
    }
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
}

async function submitBid(marketplaceData: string, signature: string) {
  try {
    const response = await axios.post(
      'https://core-api.prod.blur.io/v1/collection-bids/submit',
      {
        marketplaceData,
        signature,
      },
      {
        headers: {
          'content-Type': 'application/json',
          Accept: '/',
          'Cache-Control': 'no-cache',
          Cookie: document.cookie,
        },
      }
    );
    if (response.data.success === true) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }

  return true;
}

function getMessageToSign(signData: ISignData) {
  if (signData.root !== undefined) {
    return {
      root: signData.root,
    };
  }

  const message = {
    trader: signData.trader,
    side: signData.side,
    matchingPolicy: signData.matchingPolicy,
    collection: signData.collection,
    tokenId: signData.tokenId,
    amount: signData.amount,
    paymentToken: signData.paymentToken,
    price: signData.price,
    listingTime: signData.listingTime,
    expirationTime: signData.expirationTime,
    fees: signData.fees,
    salt: hexToDecimal(signData.salt),
    extraParams: signData.extraParams,
    nonce: signData.nonce,
  };

  return message;
}

function hexToDecimal(hexString: string): string {
  return BigInt(hexString).toString();
}
