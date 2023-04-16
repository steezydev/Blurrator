import React from 'react';
import { createRoot } from 'react-dom/client';
import Newtab from './Newtab';
import MantineProviderWrapper from '@/providers/MantineProvider';
import '../../index.css';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';

const container = document.getElementById('app-container') as Element;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <MantineProviderWrapper>
    <Notifications position='top-right' />
    <Provider store={store}>
      <Newtab />
    </Provider>
  </MantineProviderWrapper>
);
