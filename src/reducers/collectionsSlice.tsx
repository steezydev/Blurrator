import { getWalletAddress } from '@/lib/getWallet';
import { safeSub } from '@/lib/safeNumbers';
import { subscribeToBidStats } from '@/services/socket';
import {
  ActivityItem,
  Collections,
  EActivityType,
  ECollectionMode,
  ECollectionStatus,
  EMarketplace,
  IOtherBids,
  TActivity,
} from '@/types/collection.types';
import { notifications } from '@mantine/notifications';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Collections = {};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    addBid: (
      state,
      action: PayloadAction<{
        address: string;
        bidValue: number;
        bidQty: number;
      }>
    ) => {
      const address = action.payload.address.toLowerCase();
      const bidValue = action.payload.bidValue;
      const bidQty = action.payload.bidQty;

      state[address].data.currentBid = {
        value: bidValue,
        size: bidQty,
        createdAt: new Date().toISOString(),
      };
    },
    removeBid: (
      state,
      action: PayloadAction<{
        address: string;
      }>
    ) => {
      const address = action.payload.address.toLowerCase();
      state[address].data.currentBid = null;
    },
    updateBank: (
      state,
      action: PayloadAction<{
        address: string;
        bank: number;
      }>
    ) => {
      const address = action.payload.address.toLowerCase();
      const bank = action.payload.bank;

      state[address].config.bank = bank;
    },
    addCollection: (
      state,
      action: PayloadAction<{
        name: string;
        address: string;
      }>
    ) => {
      const name = action.payload.name;
      const address = action.payload.address.toLowerCase();

      // TODO: Alert if collection already exists
      if (state[address]) {
        return;
      }

      state[address] = {
        collectionName: name,
        collectionAddress: address,
        status: ECollectionStatus.init,
        mode: ECollectionMode.manual,
        config: {},
        data: {
          listingAmount: null,
          floorPrice: null,
          topBid: null,
          currentBid: null,
        },
        bidsData: {},
        activity: [],
      };
    },
    removeCollection: (state, action: PayloadAction<{ address: string }>) => {
      const address = action.payload.address.toLowerCase();
      delete state[address];
    },
    updateTopBid: (
      state,
      action: PayloadAction<{ address: string; topBid: number }>
    ) => {
      const address = action.payload.address.toLowerCase();
      const topBid = action.payload.topBid;

      state[address].data.topBid = topBid;

      Object.keys(state[address].bidsData).forEach(async (bid) => {
        const price = parseFloat(bid);

        if (price > topBid) {
          delete state[address].bidsData[bid];
        }
      });
    },
    updateFloorPrice: (
      state,
      action: PayloadAction<{ address: string; floorPrice: number }>
    ) => {
      const address = action.payload.address.toLowerCase();
      const floorPrice = action.payload.floorPrice;

      state[address].data.floorPrice = floorPrice;
    },
    updateNumberListings: (
      state,
      action: PayloadAction<{ address: string; numberListings: number }>
    ) => {
      const address = action.payload.address.toLowerCase();
      const numberListings = action.payload.numberListings;

      state[address].data.listingAmount = numberListings;
    },
    updateActivity: (
      state,
      action: PayloadAction<{ address: string; items: ActivityItem[] }>
    ) => {
      const address = action.payload.address.toLowerCase();
      const items = action.payload.items;
      const currentBid = state[address].data.currentBid;

      items.forEach((item) => {
        if (item.eventType === 'ORDER_CREATED' || item.eventType === 'SALE') {
          if (item.toAddress === getWalletAddress() && currentBid !== null) {
            currentBid.size--;
            if (currentBid.size == 0) {
              state[address].data.currentBid = null;
            }
            notifications.show({
              color: 'orange',
              title: `Bid was bought`,
              message: `Bid for collection "${state[address].collectionName}" was bought. You have ${currentBid.size} bids left`,
            });
          }

          const activityItem: TActivity = {
            id: parseInt(item.id),
            tokenId: parseInt(item.tokenId),
            fromAddress: item.fromAddress,
            toAddress: item.toAddress,
            createdAt: item.createdAt,
            transactionHash: item.transactionHash,
            eventType:
              item.eventType === 'ORDER_CREATED'
                ? EActivityType.listing
                : EActivityType.sale,
            price: parseFloat(item.price),
            priceUnit: item.priceUnit,
            marketplace:
              item.marketplace === 'BLUR'
                ? EMarketplace.blur
                : EMarketplace.opensea,
          };

          state[address].activity.unshift(activityItem);
        }
      });

      if (state[address].activity.length > 40) {
        state[address].activity.length = 40;
      }
    },
    updatedBidsData: (
      state,
      action: PayloadAction<{
        address: string;
        updates: IOtherBids[];
      }>
    ) => {
      const address = action.payload.address.toLowerCase();
      const updates = action.payload.updates;
      const topBidValue = state[address].data.topBid;

      if (!topBidValue) {
        return;
      }

      updates.forEach((updates) => {
        const price = parseFloat(updates.price);

        if (safeSub(topBidValue, price) > 0.04) {
          return;
        }

        if (updates.executableSize === 0) {
          delete state[address].bidsData[price];
          return;
        }

        state[address].bidsData[price] = {
          value: price,
          size: updates.executableSize,
          biddersCount: updates.bidderCount,
        };
      });

      if (!state[address].bidsData[topBidValue]) {
        state[address].status = ECollectionStatus.init;
      } else if (
        Object.keys(state[address].bidsData).length >= 5 &&
        state[address].status === ECollectionStatus.init
      ) {
        state[address].status = ECollectionStatus.ready;
        notifications.show({
          color: 'grape',
          title: `Collection finished syncing`,
          message: `Collection "${state[address].collectionName}" finished syncing data. The bid could be placed now.`,
        });
      }
    },
  },
});

export const {
  addBid,
  removeBid,
  updateBank,
  addCollection,
  removeCollection,
  updateTopBid,
  updateFloorPrice,
  updateNumberListings,
  updateActivity,
  updatedBidsData,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
