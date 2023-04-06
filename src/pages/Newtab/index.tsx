import React from 'react';
import { createRoot } from 'react-dom/client';
import Newtab from './Newtab';
import MantineProviderWrapper from '@/providers/MantineProvider';
import '../../index.css';
import { store } from '@/store';
import { Provider } from 'react-redux';

const container = document.getElementById('app-container') as Element;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <MantineProviderWrapper>
    <Provider store={store}>
      <Newtab />
    </Provider>
  </MantineProviderWrapper>
);
