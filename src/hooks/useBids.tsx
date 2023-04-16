import React from 'react';
import { useDispatch } from 'react-redux';
import {
  addBid,
  addCollection,
  removeBid,
  updateActivity,
  updateBank,
  updateFloorPrice,
  updateNumberListings,
  updateTopBid,
  updatedBidsData,
  removeCollection,
} from '@/reducers/collectionsSlice';
import {
  subscribeToBidPriceUpdates,
  subscribeToBidStats,
  subscribeToEventsCreated,
  subscribeToFloorUpdates,
  subscribeToListingsUpdates,
  unsubscribeFromBidPriceUpdates,
  unsubscribeFromBidStats,
  unsubscribeFromEventsCreated,
  unsubscribeFromFloorUpdates,
  unsubscribeFromListingsUpdates,
} from '@/services/socket';
import { makeBid } from '@/services/bids/makeBid';
import { useAppSelector } from '@/hooks';
import { cancelBid } from '@/services/bids/cancelBid';
import { safeAdd, safeSub } from '@/lib/safeNumbers';
import { notifications } from '@mantine/notifications';
import { Collections, ECollectionMode } from '@/types/collection.types';

export default function useBids() {
  const dispatch = useDispatch();
  const collections: Collections = useAppSelector((state) => state.collections);

  const handleRemoveCollection = (address: string) => {
    if (collections[address].data.currentBid) {
      handleCancelBid(address);
    }
    unsubscribeFromBidStats(address);
    unsubscribeFromBidPriceUpdates(address);
    unsubscribeFromFloorUpdates(address);
    unsubscribeFromListingsUpdates(address);
    unsubscribeFromEventsCreated(address);

    dispatch(removeCollection({ address }));
    notifications.show({
      color: 'green',
      title: 'Collection removed',
      message: 'Collection was removed successfully...',
    });
  };

  const moveBid = (address: string, direction: 'up' | 'down') => {
    const bank = collections[address].config.bank;
    const mode = collections[address].mode;
    const currentBidValue = collections[address].data.currentBid?.value;

    if (
      !bank ||
      mode === ECollectionMode.auto ||
      currentBidValue === undefined
    ) {
      return;
    }

    // Calculate new bid value
    const newBidValue =
      direction === 'up'
        ? safeAdd(currentBidValue, 0.01)
        : safeSub(currentBidValue, 0.01);
    const newBidQty = Math.floor(bank / newBidValue);

    cancelBid(address, currentBidValue).then((success) => {
      if (success) {
        makeBid(address, newBidValue, newBidQty).then((success) => {
          if (success) {
            dispatch(
              addBid({ address, bidValue: newBidValue, bidQty: newBidQty })
            );
          } else {
            notifications.show({
              color: 'red',
              title: 'Moving bid failed',
              autoClose: false,
              message: 'Failed to place a bid...',
            });
          }
        });
      } else {
        notifications.show({
          color: 'red',
          autoClose: false,
          title: 'Moving bid failed',
          message: 'Failed to cancel a bid...',
        });
      }
    });
  };

  const handleUpdateBank = (address: string, bank: number) => {
    dispatch(
      updateBank({
        address,
        bank,
      })
    );
  };

  const handleCancelBid = (address: string) => {
    const currentBidValue = collections[address].data.currentBid?.value;

    if (currentBidValue === undefined) {
      return;
    }

    cancelBid(address, currentBidValue).then((success) => {
      if (success) {
        dispatch(removeBid({ address }));
        notifications.show({
          color: 'green',
          title: 'Canceling bid succeeded',
          message: 'Canceled a bid successfully...',
        });
      } else {
        notifications.show({
          color: 'red',
          autoClose: false,
          title: 'Canceling bid failed',
          message: 'Failed to cancel a bid...',
        });
      }
    });
  };

  const handlePlaceBid = (
    address: string,
    bidValue: number,
    bidQty: number
  ) => {
    makeBid(address, bidValue, bidQty).then((success) => {
      if (success) {
        dispatch(addBid({ address, bidValue, bidQty }));
        notifications.show({
          color: 'green',
          title: 'Placing bid succeeded',
          message: 'Placed a bid successfully...',
        });
      } else {
        notifications.show({
          color: 'red',
          title: 'Placing bid failed',
          autoClose: false,
          message: 'Failed to place a bid...',
        });
      }
    });
  };

  const handleAddCollection = (name: string, address: string) => {
    const _name = name.trim();
    const _address = address.trim();

    dispatch(addCollection({ name: _name, address: _address }));

    subscribeToBidStats(address, (topBid) =>
      dispatch(
        updateTopBid({
          address,
          topBid,
        })
      )
    );

    subscribeToFloorUpdates(address, (floorPrice) =>
      dispatch(
        updateFloorPrice({
          address,
          floorPrice,
        })
      )
    );

    subscribeToListingsUpdates(address, (numberListings) =>
      dispatch(
        updateNumberListings({
          address,
          numberListings,
        })
      )
    );

    subscribeToEventsCreated(address, (items) =>
      dispatch(
        updateActivity({
          address,
          items,
        })
      )
    );

    subscribeToBidPriceUpdates(address, (updates) =>
      dispatch(
        updatedBidsData({
          address,
          updates,
        })
      )
    );

    notifications.show({
      color: 'green',
      title: 'Collection added',
      message: 'Collection was added successfully...',
    });
  };

  return {
    moveBid,
    handleUpdateBank,
    handleCancelBid,
    handleAddCollection,
    handleRemoveCollection,
    handlePlaceBid,
  };
}
