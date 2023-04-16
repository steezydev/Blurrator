import { ISettings } from '@/types/settings.types';
import React from 'react';
import { useStorageState } from 'react-storage-hooks';

export default function useSettings() {
  const [settings, setSettings] = useStorageState<ISettings>(
    localStorage,
    'settings',
    { privateKey: '', alchemyKey: '', totalBank: 0 } as ISettings
  );

  return { settings, setSettings };
}
