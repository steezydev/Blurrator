import React from 'react';

import Header from './Header';

function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div>
      <Header />
      <main className='p-2 px-3'>{children}</main>
      <footer className='layout py-4'>
        <div className='flex flex-col items-center text-white/20'>
          <span className='text-xs'>© Copyright 2023</span>
          <span className='text-center text-xs'>
            All rights reserved. Created by{' '}
            <a
              href='https://linktr.ee/steezydev'
              target='_blank'
              className='font-bold'
              rel='noreferrer'
            >
              steezy
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
