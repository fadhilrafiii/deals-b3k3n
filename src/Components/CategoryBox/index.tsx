import React from 'react';

import { BookCategory } from 'Shared/Types/Book';

import styles from './index.module.css';

interface CategoryBoxProps {
  category: BookCategory;
  background: string;
  logo: string;
  isActive?: boolean;
  actionClickCategory?: () => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  category,
  background,
  logo,
  isActive = false,
  actionClickCategory = () => null,
}: CategoryBoxProps) => {
  const classes = [styles.categoryBox];
  if (isActive) classes.push(styles.categoryBoxActive);

  return (
    <div
      className={classes.join(' ')}
      style={{ background }}
      role="button"
      onClick={actionClickCategory}
    >
      <h4>{category.name}</h4>
      <div className={styles.logoWrapper}>
        <img alt={category.name} src={logo} />
      </div>
    </div>
  );
};

export default CategoryBox;
