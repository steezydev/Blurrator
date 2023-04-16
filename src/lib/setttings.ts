import { decode, encode } from 'string-encode-decode';

export function getSettings() {
  if (!localStorage.getItem('settings')) return { pk: '', alchemyKey: '' };
  const settingsStr = localStorage.getItem('settings') ?? '';
  const settings = JSON.parse(settingsStr);

  return {
    pk: decode(settings.privateKey),
    alchemyKey: decode(settings.alchemyKey),
  };
}

export function getPk() {
  const settings = getSettings();
  return settings.pk;
}

export function getAlchemyApiKey() {
  const settings = getSettings();
  return settings.alchemyKey;
}
