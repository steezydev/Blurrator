import React from 'react';
import {
  FaChevronDown,
  FaChevronUp,
  FaRobot,
  FaTrashAlt,
} from 'react-icons/fa';
import { BiJoystickButton } from 'react-icons/bi';
import { ActionIcon, Button, Loader, Switch } from '@mantine/core';
import BidsTable from './BidsTable';
import ActivityTable from './ActivityTable';
import Barrel from './Barrel';
import { ECollectionStatus, ICollection } from '@/types/collection.types';
import NewBid from '@/components/NewBid';
import useBids from '@/hooks/useBids';
import useSettings from '@/hooks/useSettings';

export default function Collection({
  collectionData,
}: {
  collectionData: ICollection;
}) {
  const { handleCancelBid, moveBid, handleRemoveCollection } = useBids();
  const { settings, setSettings } = useSettings();

  return (
    <div className='relative flex w-[680px] flex-row border-0 border-b-2 border-solid border-b-white/10 pb-3 text-white'>
      <div className='flex w-1/2 flex-col gap-4 border-0 border-r border-solid border-r-white/10 px-2'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <div className='flex items-center gap-3'>
              <span className='text-xl font-bold'>
                {collectionData.collectionName}
              </span>

              <ActionIcon
                onClick={() =>
                  handleRemoveCollection(collectionData.collectionAddress)
                }
              >
                <FaTrashAlt className='text-xs text-secondary' />
              </ActionIcon>
              {collectionData.status !== ECollectionStatus.ready && (
                <Loader size='xs' />
              )}
            </div>
            <span className='text-xs text-secondary'>
              {collectionData.collectionAddress.substring(0, 6) +
                '...' +
                collectionData.collectionAddress.substring(
                  collectionData.collectionAddress.length - 6,
                  collectionData.collectionAddress.length
                )}
            </span>
          </div>
          {collectionData.data.currentBid && (
            <div className='flex flex-col items-end gap-1'>
              <Switch
                disabled
                size='md'
                onLabel={<FaRobot className='text-lg' />}
                offLabel={<BiJoystickButton className='text-base' />}
              />
              <span className='text-xs text-secondary '>Manual</span>
            </div>
          )}
        </div>
        <div className='flex flex-row justify-around border-0 border-y border-solid border-y-white/10 py-2'>
          <Barrel title='floor'>
            {collectionData.data.floorPrice?.toFixed(2)}
          </Barrel>
          <Barrel title='listed'>{collectionData.data.listingAmount}</Barrel>
          <Barrel title='top'>{collectionData.data.topBid}</Barrel>
        </div>
        <ActivityTable activityData={collectionData.activity} />
      </div>
      <div className='flex w-1/2 flex-col justify-between px-2'>
        <BidsTable
          currentBid={collectionData.data.currentBid}
          topBid={collectionData.data.topBid}
          bidsData={collectionData.bidsData}
        />
        <div className='flex flex-col gap-2 border-0 border-t border-solid border-t-white/10 pt-2'>
          <div className='flex flex-row'>
            <div className='flex w-1/2 flex-col gap-1'>
              <div className='flex flex-row justify-around'>
                <Barrel title='price'>
                  {collectionData.data.currentBid?.value}
                </Barrel>
                <Barrel title='qty'>
                  {collectionData.data.currentBid?.size}
                </Barrel>
              </div>
              <div className='flex flex-row justify-around'>
                <Barrel title='barrier'>{collectionData.config.barrier}</Barrel>
                <Barrel title='bank'>{collectionData.config.bank}</Barrel>
              </div>
            </div>
            <div className='flex w-1/2 flex-col justify-center'>
              {!collectionData.data.currentBid && (
                <div className='flex flex-col gap-1'>
                  <NewBid
                    collectionAddress={collectionData.collectionAddress}
                    disabled={
                      collectionData.status !== ECollectionStatus.ready ||
                      !settings.privateKey
                    }
                  />
                  {collectionData.status !== ECollectionStatus.ready && (
                    <span className='text-center text-xs text-secondary'>
                      Collection is being synced...
                    </span>
                  )}
                </div>
              )}
              {collectionData.status === ECollectionStatus.ready &&
                collectionData.data.currentBid && (
                  <Button.Group pos={'relative'} orientation='vertical'>
                    {/* <LoadingOverlay
                      visible={true}
                      overlayBlur={1}
                      radius={'md'}
                    /> */}
                    <Button
                      onClick={() =>
                        moveBid(collectionData.collectionAddress, 'up')
                      }
                      variant='default'
                    >
                      <FaChevronUp />
                    </Button>
                    <Button
                      onClick={() =>
                        moveBid(collectionData.collectionAddress, 'down')
                      }
                      variant='default'
                    >
                      <FaChevronDown />
                    </Button>
                  </Button.Group>
                )}
            </div>
          </div>
          {collectionData.status === ECollectionStatus.ready &&
            collectionData.data.currentBid && (
              <div className='flex flex-row items-center justify-around'>
                <Button disabled size='xs' variant='subtle'>
                  Settings
                </Button>
                <Button
                  onClick={() =>
                    handleCancelBid(collectionData.collectionAddress)
                  }
                  size='xs'
                  color='red'
                  variant='subtle'
                >
                  Cancel bid
                </Button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
