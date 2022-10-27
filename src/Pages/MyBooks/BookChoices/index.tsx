import React, { useCallback, useEffect, useState } from 'react';

import BookCard from 'Components/BookCard';
import BookCardSkeleton from 'Components/Skeleton/BookCard';
import Slider from 'Components/Slider';

import { getBooksAPI } from 'Clients/book';

import { Book } from 'Shared/Types/Book';

import styles from './index.module.css';

const BookChoices = React.memo(() => {
  const [bookChoices, setBookChoices] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBookChoices = useCallback(async () => {
    setIsLoading(true);
    const query = {
      categoryId: '1',
      page: '0',
      size: '20',
    };

    const data = await getBooksAPI(query).finally(() => setIsLoading(false));
    setBookChoices(data);
  }, []);

  useEffect(() => {
    getBookChoices();
  }, [getBookChoices]);

  if (isLoading)
    return (
      <Slider>
        <BookCardSkeleton numOfSkeletons={3} />
      </Slider>
    );

  return (
    <Slider>
      {bookChoices.length > 0 ? (
        bookChoices.map((book: Book) => <BookCard key={book.id} book={book} />)
      ) : (
        <div className={styles.noData}>No data found!</div>
      )}
    </Slider>
  );
});

export default BookChoices;
