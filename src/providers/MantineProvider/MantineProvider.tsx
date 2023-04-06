import React from 'react';
import { MantineProvider as MantineProviderCore } from '@mantine/core';

export default function MantineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProviderCore
      theme={{
        colorScheme: 'dark',
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      {children}
    </MantineProviderCore>
  );
}
