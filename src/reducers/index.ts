import { combineReducers } from '@reduxjs/toolkit';
import collectionsSlice from './collectionsSlice';

const rootReducer = combineReducers({
  collections: collectionsSlice,
});

export default rootReducer;
