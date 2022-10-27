import React from 'react';

import { SkeletonProps } from '../types';

import styles from './index.module.css';

const CategoryBoxSkeleton: React.FC<SkeletonProps> = ({ numOfSkeletons = 1 }: SkeletonProps) => {
  return (
    <React.Fragment>
      {Array(numOfSkeletons)
        .fill(0)
        .map((_: number, idx: number) => (
          <div key={idx} className={styles.skeleton} />
        ))}
    </React.Fragment>
  );
};

export default CategoryBoxSkeleton;
