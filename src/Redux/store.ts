import { configureStore } from '@reduxjs/toolkit';

import bookCategorySlice from './Slices/bookCategorySlice';
import bookMarkSlice from './Slices/bookMarkSlice';

const store = configureStore({
  reducer: {
    bookMarkSlice,
    bookCategorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
