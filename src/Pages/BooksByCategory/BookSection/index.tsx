import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import BookCard from 'Components/BookCard';
import Pagination from 'Components/Pagination';
import Select from 'Components/Select';
import BookCardSkeleton from 'Components/Skeleton/BookCard';

import { getBooksAPI } from 'Clients/book';

import { CONST_PAGE_SIZES_OPTIONS } from 'Shared/Constants/PageSize';
import { usePagination } from 'Shared/Hooks/usePagination';
import { Book, BookCategory } from 'Shared/Types/Book';

import styles from '../index.module.css';

interface BookSectionProps {
  category: BookCategory;
}

const BookSection: React.FC<BookSectionProps> = ({ category }: BookSectionProps) => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBooks = useCallback(async () => {
    setIsLoading(true);
    const data = await getBooksAPI({ categoryId: category.id.toString() }).finally(() =>
      setIsLoading(false),
    );
    setBooks(data);
  }, [category.id]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const filteredBooks = useMemo(() => {
    const searchKey = searchParams.get('search');
    if (searchKey)
      return books.filter(
        (book: Book) =>
          book.title.toLowerCase().indexOf(searchKey.toLowerCase()) >= 0 ||
          book.authors.join('').toLowerCase().indexOf(searchKey.toLowerCase()) >= 0,
      );

    return books;
  }, [books, searchParams]);

  const {
    pagination: { page, totalData, pageSize },
    handleChangePageSize,
    handleChangePage,
  } = usePagination(filteredBooks);

  const shownBooks = useMemo(
    () => filteredBooks.slice((page - 1) * pageSize, page * pageSize),
    [filteredBooks, page, pageSize],
  );

  if (!isLoading && shownBooks.length === 0) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>{category.name}</h2>
      <div className={styles.pageSizeSelect}>
        <span>books/page:</span>&nbsp;&nbsp;
        <Select
          defaultValue={CONST_PAGE_SIZES_OPTIONS[1]}
          options={CONST_PAGE_SIZES_OPTIONS}
          onChange={handleChangePageSize}
        />
      </div>
      <div className={styles.bookContainer}>
        {isLoading ? (
          <BookCardSkeleton numOfSkeletons={7} />
        ) : (
          shownBooks.map((book: Book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
      <Pagination
        page={page}
        totalPages={Math.ceil(totalData / pageSize)}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default BookSection;
