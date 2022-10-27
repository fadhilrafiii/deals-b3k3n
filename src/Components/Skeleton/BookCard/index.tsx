import React from 'react';

import { SkeletonProps } from '../types';

import styles from './index.module.css';

const BookCardSkeleton: React.FC<SkeletonProps> = ({ numOfSkeletons }: SkeletonProps) => {
  return (
    <React.Fragment>
      {Array(numOfSkeletons)
        .fill(0)
        .map((_: number, idx: number) => (
          <div key={idx} className={styles.skeleton}>
            <div className={styles.bookCover} />
            <div className={styles.bookName} />
            <div className={styles.bookAuthors} />
          </div>
        ))}
    </React.Fragment>
  );
};

export default BookCardSkeleton;
