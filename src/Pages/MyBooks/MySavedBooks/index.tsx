import React, { useMemo, useRef } from 'react';

import BookCard from 'Components/BookCard';
import Pagination from 'Components/Pagination';
import Select from 'Components/Select';

import { useAppSelector } from 'Redux/hooks';
import { bookmarkSelector } from 'Redux/Slices/bookMarkSlice';

import { CONST_PAGE_SIZES_OPTIONS } from 'Shared/Constants/PageSize';
import { usePagination } from 'Shared/Hooks/usePagination';
import { Book } from 'Shared/Types/Book';

import styles from './index.module.css';

const MySavedBooks = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { bookmarks } = useAppSelector(bookmarkSelector);
  const { pagination, handleChangePageSize, handleChangePage } = usePagination(
    bookmarks as unknown[],
  );

  const handleScrollTopOnPageChange = () => {
    const offsetTop = containerRef.current?.offsetTop || 0;
    if (Math.abs(window.pageYOffset - offsetTop) > 200) {
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const bookmarkBooks = useMemo(() => {
    return Object.values(bookmarks);
  }, [bookmarks]);

  const bookmarkBooksByPage = useMemo(() => {
    const { page, pageSize } = pagination;

    return bookmarkBooks.slice((page - 1) * pageSize, page * pageSize);
  }, [bookmarkBooks, pagination]);

  return (
    <div className={styles.mySavedBooks} ref={containerRef}>
      <div className={styles.pageSizeSelect}>
        <span>books/page:</span>&nbsp;&nbsp;
        <Select
          defaultValue={CONST_PAGE_SIZES_OPTIONS[1]}
          options={CONST_PAGE_SIZES_OPTIONS}
          onChange={handleChangePageSize}
        />
      </div>
      <div className={styles.bookmarks}>
        {bookmarkBooksByPage.map((book: Book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <br />
      <Pagination
        page={pagination.page}
        totalPages={Math.ceil(pagination.totalData / pagination.pageSize)}
        handleChangePage={(page: number) => {
          handleChangePage(page);
          handleScrollTopOnPageChange();
        }}
      />
    </div>
  );
};

export default MySavedBooks;
