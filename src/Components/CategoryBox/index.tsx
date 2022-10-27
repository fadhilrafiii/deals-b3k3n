import React from 'react';

import { BookCategory } from 'Shared/Types/Book';

import styles from './index.module.css';

interface CategoryBoxProps {
  category: BookCategory;
  background: string;
  logo: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  category,
  background,
  logo,
}: CategoryBoxProps) => {
  return (
    <div className={styles.categoryBox} style={{ background }}>
      <h4>{category.name}</h4>
      <div className={styles.logoWrapper}>
        <img alt={category.name} src={logo} />
      </div>
    </div>
  );
};

export default CategoryBox;
