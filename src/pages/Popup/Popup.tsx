import React from 'react';
import logo from '@/assets/img/logo.svg';
import { Button } from '@mantine/core';

const Popup = () => {
  function openNewTab() {
    chrome.tabs.create({ url: 'newtab.html' });
  }

  return (
    <div>
      <div className='flex flex-col items-start gap-2 px-3 py-4 pb-8'>
        <span>
          <Button variant='subtle' onClick={openNewTab}>
            dashboard
          </Button>
        </span>
        <a target={'_blank'} href='https://blur.io/portfolio'>
          <Button variant='subtle'>portfolio</Button>
        </a>
        <a target={'_blank'} href='https://blur.io/portfolio/bids'>
          <Button variant='subtle'>bids</Button>
        </a>
        <a
          target={'_blank'}
          href={`https://blur.io/airdrop#1?cache-bust=${new Date().getTime()}`}
        >
          <Button variant='subtle'>airdrop</Button>
        </a>
        <a target={'_blank'} href='https://blur.io/collections'>
          <Button variant='subtle'>collections</Button>
        </a>
      </div>
    </div>
  );
};

export default Popup;
