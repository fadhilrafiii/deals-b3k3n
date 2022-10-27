import React, { useCallback, useMemo } from 'react';

import { BsFillBookmarkFill } from '@react-icons/all-files/bs/BsFillBookmarkFill';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { addBookmark, bookmarkSelector, removeBookmark } from 'Redux/Slices/bookMarkSlice';

import { Colors } from 'Shared/Constants/Color';
import { Book } from 'Shared/Types/Book';

import styles from './index.module.css';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }: BookCardProps) => {
  const dispatch = useAppDispatch();
  const { bookmarks } = useAppSelector(bookmarkSelector);

  const isBookmarked = useMemo(() => Boolean(bookmarks[book.id]), [book.id, bookmarks]);

  const actionClickBookmark = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      if (!isBookmarked) dispatch(addBookmark(book));
      else dispatch(removeBookmark(book.id));
    },
    [book, dispatch, isBookmarked],
  );

  return (
    <div className={styles.bookCard}>
      <span className={styles.bookMark} role="button" onClick={actionClickBookmark}>
        <BsFillBookmarkFill size={24} fill={isBookmarked ? Colors.Secondary : Colors.Grey} />
      </span>
      <img alt={book.title} src={book.cover_url} />
      <h4 className={styles.bookName}>{book.title}</h4>
      <span className={styles.bookAuthors}>by {book.authors.join(' ')}</span>
    </div>
  );
};

export default BookCard;
