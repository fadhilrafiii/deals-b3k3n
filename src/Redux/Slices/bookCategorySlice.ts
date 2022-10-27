import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookCategory } from 'Shared/Types/Book';

import { RootState } from '../store';

interface BookCategoriesState {
  isCategoriesLoading: boolean;
  categories: BookCategory[];
}

const initialState: BookCategoriesState = {
  isCategoriesLoading: false,
  categories: [],
};

export const bookMarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setCategoriesLoading: (state: BookCategoriesState, action: PayloadAction<boolean>) => {
      state.isCategoriesLoading = action.payload;
    },
    setCategories: (state: BookCategoriesState, action: PayloadAction<BookCategory[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories, setCategoriesLoading } = bookMarkSlice.actions;
export const bookCategoriesSelector = (state: RootState) => state.bookCategorySlice;

export default bookMarkSlice.reducer;
