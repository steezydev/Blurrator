import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './reducers';
import throttle from './lib/throttle';
import {
  subscribeToBidPriceUpdates,
  subscribeToBidStats,
  subscribeToEventsCreated,
  subscribeToFloorUpdates,
  subscribeToListingsUpdates,
} from './services/socket';
import {
  updateActivity,
  updateFloorPrice,
  updateNumberListings,
  updateTopBid,
  updatedBidsData,
} from './reducers/collectionsSlice';

function loadState(): RootState | undefined {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as RootState;
  } catch (err) {
    return undefined;
  }
}

function saveState(state: RootState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
}

function processState(state: RootState) {
  Object.keys(state.collections).forEach(async (address) => {
    subscribeToBidStats(address, (topBid) =>
      store.dispatch(
        updateTopBid({
          address,
          topBid,
        })
      )
    );

    subscribeToFloorUpdates(address, (floorPrice) =>
      store.dispatch(
        updateFloorPrice({
          address,
          floorPrice,
        })
      )
    );

    subscribeToListingsUpdates(address, (numberListings) =>
      store.dispatch(
        updateNumberListings({
          address,
          numberListings,
        })
      )
    );

    subscribeToEventsCreated(address, (items) =>
      store.dispatch(
        updateActivity({
          address,
          items,
        })
      )
    );

    subscribeToBidPriceUpdates(address, (updates) =>
      store.dispatch(
        updatedBidsData({
          address,
          updates,
        })
      )
    );
  });

  return state;
}

const loadedState = loadState();
const processedState = loadedState ? processState(loadedState) : undefined;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: processedState,
});

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

// Infer the `RootState` and `AppDispatch` types from the store itself
//export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
