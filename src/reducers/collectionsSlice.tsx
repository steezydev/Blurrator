import {
  ECollectionMode,
  ECollectionStatus,
  ICollection,
} from '@/types/collection.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Collections = { [key: string]: ICollection };

const initialState: Collections = {};

interface IAddCollectionPayload {
  name: string;
  address: string;
}

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    addCollection: (state, action: PayloadAction<IAddCollectionPayload>) => {
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
    },
  },
});

export const { addCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;
