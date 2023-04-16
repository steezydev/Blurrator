import { getPk } from './setttings';
import { ethers } from 'ethers';
export function getWalletAddress() {
  let publicAddress = '';
  const pk = getPk();
  console.log(pk);
  if (pk) {
    const wallet = new ethers.Wallet(pk);
    publicAddress = wallet.address;
  }

  return publicAddress;
}
