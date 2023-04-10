import {
  EActivityType,
  ECollectionMode,
  ECollectionStatus,
  EMarketplace,
  ICollection,
  TActivity,
} from '@/types/collection.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActivityItem {
  id: string;
  tokenId: string;
  fromAddress: string;
  toAddress: string;
  createdAt: string;
  transactionHash: string;
  eventType: string;
  price: string;
  priceUnit: string;
  marketplace: string;
}

type Collections = { [key: string]: ICollection };

const initialState: Collections = {};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
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
        return state;
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

      // TODO: Subscribe to sockets
    },
    updateTopBid: (
      state,
      action: PayloadAction<{ address: string; topBid: number }>
    ) => {
      const address = action.payload.address.toLowerCase();
      const topBid = action.payload.topBid;

      state[address].data.topBid = topBid;
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

      items.forEach((item) => {
        if (item.eventType === 'ORDER_CREATED' || item.eventType === 'SALE') {
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

          return state[address].activity.push(activityItem);
        }
      });
    },
    updatedBidsData: (
      state,
      action: PayloadAction<{
        address: string;
        updates: {
          price: string;
          executableSize: number;
          bidderCount: number;
        }[];
      }>
    ) => {
      const address = action.payload.address.toLowerCase();
      const updates = action.payload.updates;

      // TODO: Detect top 5 bids

      updates.forEach((updates) => {
        const price = updates.price;
        const executableSize = updates.executableSize;
        const bidderCount = updates.bidderCount;

        state[address].bidsData[price] = {
          value: parseFloat(price),
          size: executableSize,
          biddersCount: bidderCount,
        };
      });
    },
  },
});

export const { addCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;
