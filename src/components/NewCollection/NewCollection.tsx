import React, { useState } from 'react';
import { Button, Drawer, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useDispatch } from 'react-redux';
import { addCollection } from '@/reducers/collectionsSlice';

export default function NewCollection() {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleAdd = () => {
    if (name === '') {
      return false;
    }

    // TODO: Validate address
    if (address === '') {
      return false;
    }

    dispatch(addCollection({ name, address }));
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
        <div className='flex flex-col gap-3'>
          <TextInput
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            placeholder='Name'
            label='Name'
          />
          <TextInput
            value={address}
            onChange={(event) => setAddress(event.currentTarget.value)}
            placeholder='Address'
            label='Address'
          />
        </div>
        <Button
          disabled={name === '' || address === ''}
          fullWidth
          className='mt-4'
          onClick={handleAdd}
        >
          Add
        </Button>
      </Drawer>
      <Button onClick={open}>Add collection</Button>
    </>
  );
}
