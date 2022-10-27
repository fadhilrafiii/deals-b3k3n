import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book } from 'Shared/Types/Book';

import { RootState } from '../store';

interface BookMarkBooksState {
  bookmarks: Record<number, Book>;
}

const localStorageBookmarks = localStorage.getItem('deals-book-bookmark');
const initialState: BookMarkBooksState = {
  bookmarks: localStorageBookmarks ? JSON.parse(localStorageBookmarks) : {},
};

export const bookMarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state: BookMarkBooksState, action: PayloadAction<Book>) => {
      state.bookmarks[action.payload.id] = action.payload;
      localStorage.setItem('deals-book-bookmark', JSON.stringify(state.bookmarks));
    },
    removeBookmark: (state: BookMarkBooksState, action: PayloadAction<number>) => {
      delete state.bookmarks[action.payload];
      localStorage.setItem('deals-book-bookmark', JSON.stringify(state.bookmarks));
    },
  },
});

export const { addBookmark, removeBookmark } = bookMarkSlice.actions;
export const bookmarkSelector = (state: RootState) => state.bookMarkSlice;

export default bookMarkSlice.reducer;
