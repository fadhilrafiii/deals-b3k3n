import React from 'react';

import { RiArrowLeftSLine } from '@react-icons/all-files/ri/RiArrowLeftSLine';
import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine';

import styles from './index.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  handleChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  handleChangePage,
}: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.leftArrow}
        disabled={page === 1}
        onClick={() => handleChangePage(page - 1)}
      >
        <RiArrowLeftSLine size={32} />
      </button>
      <div className={styles.pages}>
        {page > 1 && <button onClick={() => handleChangePage(page - 1)}>{page - 1}</button>}
        {page > 0 && (
          <button onClick={() => handleChangePage(page)} className={styles.activePage}>
            {page}
          </button>
        )}
        {page < totalPages && (
          <button onClick={() => handleChangePage(page + 1)}>{page + 1}</button>
        )}
      </div>
      <button
        className={styles.rightArrow}
        disabled={page === totalPages}
        onClick={() => handleChangePage(page + 1)}
      >
        <RiArrowRightSLine size={32} />
      </button>
    </div>
  );
};

export default Pagination;
