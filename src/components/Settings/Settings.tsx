import React from 'react';
import { Button, Drawer, NumberInput, PasswordInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';

import { FaEthereum } from 'react-icons/fa';
import { decode, encode } from 'string-encode-decode';
import { notifications } from '@mantine/notifications';
import useSettings from '@/hooks/useSettings';

export default function Settings() {
  const [opened, { open, close }] = useDisclosure(false);

  const { settings, setSettings } = useSettings();

  const form = useForm({
    initialValues: {
      privateKey: decode(settings.privateKey),
      alchemyKey: decode(settings.alchemyKey),
      totalBank: settings.totalBank,
    },
    validate: {
      privateKey: (value) =>
        value.length <= 0 ? 'privateKey is too short' : null,
      alchemyKey: (value) =>
        value.length <= 0 ? 'alchemyKey is too short' : null,
      totalBank: (value) =>
        value <= 0 ? 'Value should be greater that 0' : null,
    },
  });

  const handleAdd = (values: {
    privateKey: string;
    alchemyKey: string;
    totalBank: number;
  }) => {
    setSettings({
      privateKey: encode(values.privateKey),
      alchemyKey: encode(values.alchemyKey),
      totalBank: values.totalBank,
    });
    close();
    notifications.show({
      title: 'Settings updated',
      message: 'Settings were updated successfully',
      color: 'green',
    });
  };

  return (
    <>
      <Drawer opened={opened} position='right' onClose={close} title='Settings'>
        <form onSubmit={form.onSubmit((values) => handleAdd(values))}>
          <div className='flex flex-col gap-3'>
            <PasswordInput
              {...form.getInputProps('privateKey')}
              placeholder='Private key'
              label='Private key'
              description='Your private key is stored locally and never sent to the server'
              withAsterisk
            />
            <PasswordInput
              {...form.getInputProps('alchemyKey')}
              placeholder='Alchemy API key'
              label='Alchemy API key'
              description='API key is stored locally and never sent to the server'
              withAsterisk
            />
            <NumberInput
              {...form.getInputProps('totalBank')}
              step={0.01}
              precision={2}
              min={0}
              placeholder='Total bank'
              label='Total bank'
              icon={<FaEthereum />}
            />
          </div>
          <Button
            disabled={
              form.values.privateKey === '' || form.values.alchemyKey === ''
            }
            fullWidth
            className='mt-4'
            type='submit'
          >
            Set settings
          </Button>
        </form>
      </Drawer>
      <Button variant='light' onClick={open}>
        Settings
      </Button>
    </>
  );
}
