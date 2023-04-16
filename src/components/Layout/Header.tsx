import React from 'react';
import NewCollection from '../NewCollection/NewCollection';
import Settings from '../Settings/Settings';
import { getWalletAddress } from '@/lib/getWallet';
import { useStorageState } from 'react-storage-hooks';
import { ISettings } from '@/types/settings.types';
import { decode, encode } from 'string-encode-decode';
import useSettings from '@/hooks/useSettings';

function Header() {
  const wallet = getWalletAddress() ?? '';

  return (
    <header className='layout flex w-full flex-row items-center justify-between py-3'>
      <div className='flex items-center gap-10'>
        <div className='flex flex-col'>
          <span className='text-3xl font-black'>Blurrator v0.2</span>
          <span>Blur.io Bidding Assistant Tool</span>
        </div>
        <Settings />
        {wallet && (
          <div className='flex flex-col gap-0'>
            <span className='text-xs text-secondary'>Your address:</span>
            <span className='text-xs '>{wallet}</span>
          </div>
        )}
      </div>
      <NewCollection />
    </header>
  );
}

export default Header;
