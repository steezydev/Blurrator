import { combineReducers } from '@reduxjs/toolkit';
import collectionsSlice from './collectionsSlice';

const rootReducer = combineReducers({
  collections: collectionsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
