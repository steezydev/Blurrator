import React from 'react';
import NewCollection from '../NewCollection/NewCollection';

function Header() {
  return (
    <header className='layout flex w-full flex-row items-center justify-between py-3'>
      <div className='flex flex-col'>
        <span className='text-3xl font-black'>Blurrator v0.2</span>
        <span>Blur.io Bidding Assistant Tool</span>
      </div>
      <NewCollection />
    </header>
  );
}

export default Header;
