import React, { useState } from 'react';
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
import { BiJoystickButton } from 'react-icons/bi';
import { FaEthereum, FaRobot } from 'react-icons/fa';

export default function NewBid() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        position='right'
        onClose={close}
        title='Add collection'
      >
        <SegmentedControl
          fullWidth
          data={[
            {
              value: 'preview',
              label: (
                <Center>
                  <FaRobot className='text-lg' />
                  <Box ml={10}>Auto</Box>
                </Center>
              ),
            },
            {
              value: 'code',
              label: (
                <Center>
                  <BiJoystickButton className='text-base' />
                  <Box ml={10}>Manual</Box>
                </Center>
              ),
            },
          ]}
        />
        <div className='flex flex-row justify-between gap-5'>
          <NumberInput
            defaultValue={0.01}
            step={0.01}
            precision={2}
            max={0.1}
            min={0}
            placeholder='Barrier'
            label='Barrier'
            icon={<FaEthereum />}
          />
          <NumberInput
            step={0.1}
            precision={2}
            min={0}
            defaultValue={2}
            placeholder='Bank'
            label='Bank'
            icon={<FaEthereum />}
          />
        </div>
      </Drawer>
      <Button onClick={open}>Add collection</Button>
    </>
  );
}
