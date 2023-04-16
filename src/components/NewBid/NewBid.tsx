import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Drawer,
  NumberInput,
  SegmentedControl,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BiCoin, BiJoystickButton } from 'react-icons/bi';
import { FaEthereum, FaRobot } from 'react-icons/fa';
import { useAppSelector } from '@/hooks';
import Barrel from '../Collection/Barrel';
import { safeSub } from '@/lib/safeNumbers';
import { useForm } from '@mantine/form';
import useBids from '@/hooks/useBids';
import { useStorageState } from 'react-storage-hooks';
import { ISettings } from '@/types/settings.types';

export default function NewBid({
  disabled,
  collectionAddress,
}: {
  disabled: boolean;
  collectionAddress: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const { handlePlaceBid, handleUpdateBank } = useBids();

  const collections = useAppSelector((state) => state.collections);
  const collectionData = collections[collectionAddress];

  const [settings, setSettings] = useStorageState<ISettings>(
    localStorage,
    'settings',
    { privateKey: '', alchemyKey: '', totalBank: 0 } as ISettings
  );

  const form = useForm({
    initialValues: {
      bidValue: safeSub(collectionData.data.topBid!, 0.01),
      bank: settings.totalBank,
    },
    validate: {
      bidValue: (value) =>
        value <= 0 ? 'Value should be greater than 0' : null,
      bank: (value) => (value <= 0 ? 'Value should be greater than 0' : null),
    },
  });

  const handleAdd = (values: { bidValue: number; bank: number }) => {
    handlePlaceBid(
      collectionAddress,
      values.bidValue,
      Math.floor(values.bank / values.bidValue)
    );
    handleUpdateBank(collectionAddress, values.bank);
    close();
    form.reset();
  };

  return (
    <>
      <Drawer
        opened={opened}
        position='right'
        onClose={close}
        title={'Place bid for: ' + collectionData.collectionName}
      >
        <div className='flex flex-col gap-3'>
          <SegmentedControl
            fullWidth
            data={[
              {
                value: 'manual',
                label: (
                  <Center>
                    <BiJoystickButton className='text-base' />
                    <Box ml={10}>Manual</Box>
                  </Center>
                ),
              },
              {
                value: 'auto',
                disabled: true,
                label: (
                  <Center>
                    <FaRobot className='text-lg' />
                    <Box ml={10}>Auto</Box>
                  </Center>
                ),
              },
            ]}
          />
          <div className='flex flex-row justify-around border-0 border-y border-solid border-y-white/10 py-2'>
            <Barrel title='floor'>{collectionData.data.floorPrice}</Barrel>
            <Barrel title='listed'>{collectionData.data.listingAmount}</Barrel>
            <Barrel title='top'>{collectionData.data.topBid}</Barrel>
          </div>
          <form onSubmit={form.onSubmit((values) => handleAdd(values))}>
            <div className='flex flex-row justify-between gap-5'>
              <NumberInput
                {...form.getInputProps('bidValue')}
                step={0.01}
                precision={2}
                max={safeSub(collectionData.data.topBid!, 0.01)}
                min={0}
                placeholder='Bid value'
                label='Bid value'
                icon={<FaEthereum />}
              />
              <NumberInput
                {...form.getInputProps('bank')}
                step={0.1}
                precision={2}
                min={0}
                placeholder='Bank'
                label='Bank'
                icon={<FaEthereum />}
              />
            </div>
            <div className='flex flex-row justify-between gap-5'>
              <NumberInput
                readOnly
                precision={0}
                value={Math.floor(form.values.bank / form.values.bidValue)}
                placeholder='Qty'
                label='Qty'
                icon={<BiCoin />}
              />
              <NumberInput
                readOnly
                precision={2}
                value={
                  Math.floor(form.values.bank / form.values.bidValue) *
                  form.values.bidValue
                }
                placeholder='Total'
                label='Total'
                icon={<FaEthereum />}
              />
            </div>

            <Button fullWidth className='mt-4' type='submit'>
              Place bid
            </Button>
          </form>
        </div>
      </Drawer>
      <Button disabled={disabled} onClick={open}>
        Place bid
      </Button>
    </>
  );
}
