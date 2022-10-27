import React, { useCallback, useEffect } from 'react';

import CategoryBox from 'Components/CategoryBox';
import CategoryBoxSkeleton from 'Components/Skeleton/CategoryBox';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import {
  bookCategoriesSelector,
  setCategories,
  setCategoriesLoading,
} from 'Redux/Slices/bookCategorySlice';

import { getBookCategoriesAPI } from 'Clients/category';

import { BookCategory } from 'Shared/Types/Book';

import { CONST_CATEGORIES_BACKGROUND, CONST_CATEGORIES_LOGO } from './constants';

import styles from './index.module.css';

interface CategoriesProps {
  filter: Record<number, boolean>;
  handleToggleFilterCategory: (categoryId: number) => void;
}

const Categories = ({ filter, handleToggleFilterCategory }: CategoriesProps) => {
  const dispatch = useAppDispatch();
  const { isCategoriesLoading, categories } = useAppSelector(bookCategoriesSelector);

  const getBookCategories = useCallback(async () => {
    dispatch(setCategoriesLoading(true));
    const data = await getBookCategoriesAPI().finally(() => dispatch(setCategoriesLoading(false)));
    dispatch(setCategories(data));
  }, [dispatch]);

  useEffect(() => {
    if (categories.length === 0) getBookCategories();
  }, [getBookCategories, categories]);

  if (isCategoriesLoading)
    return (
      <div className={styles.categories}>
        <CategoryBoxSkeleton numOfSkeletons={3} />
      </div>
    );

  return (
    <div className={styles.categories}>
      {categories.length > 0 ? (
        categories.map((category: BookCategory, idx: number) => (
          <CategoryBox
            key={category.id}
            category={category}
            background={CONST_CATEGORIES_BACKGROUND[idx % categories.length]}
            logo={CONST_CATEGORIES_LOGO[idx % categories.length]}
            isActive={filter[category.id]}
            actionClickCategory={() => handleToggleFilterCategory(category.id)}
          />
        ))
      ) : (
        <div className={styles.noData}>No data found!</div>
      )}
    </div>
  );
};

export default Categories;
