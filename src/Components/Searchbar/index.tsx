import React, { forwardRef, Ref, useCallback, useEffect, useState } from 'react';

import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { useSearchParams } from 'react-router-dom';

import { useForwardRef } from 'Shared/Hooks/useForwardRef';

import styles from './index.module.css';

interface SearchbarProps {
  isOpen?: boolean;
  shouldSync?: boolean;
}

const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  ({ isOpen = true, shouldSync = false }: SearchbarProps, ref: Ref<HTMLInputElement>) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isShowInput, setIsShowInput] = useState(isOpen);
    const searchRef = useForwardRef(ref, null);

    const handleSearch = () => {
      searchParams.set('search', searchRef.current?.value || '');
      setSearchParams(searchParams);
    };

    const handleOpenSearchbar = () => setIsShowInput(false);

    const handleClickSearchButton = () => {
      if (!isShowInput) handleOpenSearchbar();
      else handleSearch();
    };

    const handleSyncValue = useCallback(() => {
      const params = searchParams.get('search');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (params) searchRef.current!.value = params;
    }, [searchParams, searchRef]);

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSearch();
    };

    useEffect(() => {
      if (shouldSync) handleSyncValue();
    }, [handleSyncValue, shouldSync]);

    const classes = [styles.searchContainer];
    if (!isShowInput) classes.push(styles.searchContainerClosed);

    return (
      <div className={classes.join(' ')}>
        <input
          type="search"
          ref={searchRef}
          placeholder="Search books here..."
          className={styles.searchInput}
          onKeyDown={handlePressEnter}
        />
        <span className={styles.searchButton} role="button" onClick={handleClickSearchButton}>
          <FiSearch size="16px" />
        </span>
      </div>
    );
  },
);

export default Searchbar;
