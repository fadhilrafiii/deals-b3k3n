import React from 'react';

import BookChoices from './BookChoices';
import Categories from './Categories';
import MySavedBooks from './MySavedBooks';

import styles from './index.module.css';

const MyBooks = () => {
  return (
    <div>
      <h1 className={styles.sectionTitle}>Books Choices For You</h1>
      <BookChoices />
      <br />
      <br />
      <h2 className={styles.sectionTitle}>Book Categories</h2>
      <Categories />
      <br />
      <br />
      <br />
      <h2 className={styles.sectionTitle}>My Saved Books</h2>
      <MySavedBooks />
    </div>
  );
};

export default MyBooks;
