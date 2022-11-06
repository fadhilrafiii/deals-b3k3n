import React, { useCallback, useEffect, useState } from 'react';

import { FaArrowUp } from '@react-icons/all-files/fa/FaArrowUp';
import { useSearchParams } from 'react-router-dom';

import Searchbar from 'Components/Searchbar';
import BookCardSkeleton from 'Components/Skeleton/BookCard';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import {
  bookCategoriesSelector,
  setCategories,
  setCategoriesLoading,
} from 'Redux/Slices/bookCategorySlice';

import { getBookCategoriesAPI } from 'Clients/category';

import { Colors } from 'Shared/Constants/Color';
import { BookCategory } from 'Shared/Types/Book';

import BookSection from './BookSection';
import Categories from './Categories';

import styles from './index.module.css';

const BooksByCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { isCategoriesLoading, categories } = useAppSelector(bookCategoriesSelector);
  const [filterCategories, setFilterCategories] = useState<Record<number, boolean>>({});

  const getBookCategories = useCallback(async () => {
    dispatch(setCategoriesLoading(true));
    const data = await getBookCategoriesAPI().finally(() => dispatch(setCategoriesLoading(false)));
    dispatch(setCategories(data));
  }, [dispatch]);

  useEffect(() => {
    getBookCategories();
  }, [getBookCategories]);

  const handleSyncFilterCategories = useCallback(() => {
    const categoryMap: Record<number, boolean> = {};
    const params = searchParams.get('category');
    if (params) {
      categories.forEach((category: BookCategory) => {
        if (category.id.toString() === params) categoryMap[category.id] = true;
        else categoryMap[category.id] = false;
      });
    } else {
      categories.forEach((category: BookCategory) => {
        categoryMap[category.id] = true;
      });
    }

    setFilterCategories(categoryMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  useEffect(() => {
    handleSyncFilterCategories();
  }, [handleSyncFilterCategories]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleToggleFilterCategory = useCallback(
    (categoryId: number) => {
      const params = searchParams.get('category');
      if (params) {
        searchParams.delete('category');
        setSearchParams(searchParams);
      }

      setFilterCategories((prev: Record<number, boolean>) => {
        return {
          ...prev,
          [categoryId]: !prev[categoryId],
        };
      });
    },
    [searchParams, setSearchParams],
  );

  if (isCategoriesLoading)
    return (
      <React.Fragment>
        <h1 className={styles.sectionTitle}>All Books</h1>
        <div className={styles.bookContainer}>
          <Categories
            filter={filterCategories}
            handleToggleFilterCategory={handleToggleFilterCategory}
          />
        </div>
        <div className={styles.bookContainer}>
          <BookCardSkeleton numOfSkeletons={5} />
        </div>
      </React.Fragment>
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.sectionTitle}>Books by Category</h1>
      <Categories
        filter={filterCategories}
        handleToggleFilterCategory={handleToggleFilterCategory}
      />
      <br />
      <br />
      <Searchbar shouldSync />
      <br />
      <br />
      {categories.map((category: BookCategory) => {
        if (filterCategories[category.id]) {
          return <BookSection key={category.id} category={category} />;
        } else return null;
      })}
      <div className={styles.scrollToTopButton}>
        <button onClick={handleScrollToTop}>
          <FaArrowUp fill={Colors.Primary} size={20} />
        </button>
      </div>
    </div>
  );
};

export default BooksByCategory;
