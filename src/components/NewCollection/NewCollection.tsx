import React, { useState } from 'react';
import { Button, Drawer, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';

import { useDispatch } from 'react-redux';
import { addCollection } from '@/reducers/collectionsSlice';
import { isAddress } from 'ethers';

export default function NewCollection() {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { name: '', address: '' },
    validate: {
      name: (value) => (value.length <= 0 ? 'Name is too short' : null),
      address: (value) =>
        !isAddress(value) ? 'Enter a valid contract address' : null,
    },
  });

  const handleAdd = (values: { name: string; address: string }) => {
    dispatch(addCollection({ name: values.name, address: values.address }));
    close();
  };

  return (
    <>
      <Drawer
        opened={opened}
        position='right'
        onClose={close}
        title='Add collection'
      >
        <form onSubmit={form.onSubmit((values) => handleAdd(values))}>
          <div className='flex flex-col gap-3'>
            <TextInput
              {...form.getInputProps('name')}
              placeholder='Name'
              label='Name'
            />
            <TextInput
              {...form.getInputProps('address')}
              placeholder='Address'
              label='Address'
            />
          </div>
          <Button
            disabled={form.values.name === '' || form.values.address === ''}
            fullWidth
            className='mt-4'
            type='submit'
          >
            Add
          </Button>
        </form>
      </Drawer>
      <Button onClick={open}>Add collection</Button>
    </>
  );
}
