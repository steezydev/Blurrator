import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup';
import MantineProviderWrapper from '@/providers/MantineProvider';
import '../../index.css';

const container = document.getElementById('app-container') as Element;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <MantineProviderWrapper>
    <Popup />
  </MantineProviderWrapper>
);
