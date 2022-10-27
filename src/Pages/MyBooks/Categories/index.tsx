import React, { useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

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

const Categories = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isCategoriesLoading, categories } = useAppSelector(bookCategoriesSelector);

  const getBookCategories = useCallback(async () => {
    dispatch(setCategoriesLoading(true));
    const data = await getBookCategoriesAPI().finally(() => dispatch(setCategoriesLoading(false)));
    dispatch(setCategories(data));
  }, [dispatch]);

  const handleRedirectBooksPage = useCallback(
    (categoryId: number) => {
      navigate(`/books?category=${categoryId}`);
    },
    [navigate],
  );

  useEffect(() => {
    getBookCategories();
  }, [getBookCategories]);

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
            actionClickCategory={() => handleRedirectBooksPage(category.id)}
          />
        ))
      ) : (
        <div className={styles.noData}>No data found!</div>
      )}
    </div>
  );
});

export default Categories;
