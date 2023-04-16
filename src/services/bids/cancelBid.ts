import axios from 'axios';

export async function cancelBid(address: string, value: number) {
  try {
    const response = await axios.post(
      'https://core-api.prod.blur.io/v1/collection-bids/cancel',
      {
        contractAddress: address,
        prices: [value.toString()],
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
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
}
