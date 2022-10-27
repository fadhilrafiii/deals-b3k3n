import React, { useRef, useState } from 'react';

import { FiSearch } from '@react-icons/all-files/fi/FiSearch';

import styles from './index.module.css';

interface SearchbarProps {
  isOpen?: boolean;
}

const Searchbar: React.FC<SearchbarProps> = ({ isOpen = true }: SearchbarProps) => {
  const [isShowInput, setIsShowInput] = useState(isOpen);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    console.log(searchRef.current?.value);
  };

  const handleOpenSearchbar = () => setIsShowInput(false);

  const handleClickSearchButton = () => {
    if (!isShowInput) handleOpenSearchbar();
    else handleSearch();
  };

  const classes = [styles.searchContainer];
  if (!isShowInput) classes.push(styles.searchContainerClosed);

  return (
    <div className={classes.join(' ')}>
      <input ref={searchRef} placeholder="Search books here..." className={styles.searchInput} />
      <span className={styles.searchButton} role="button" onClick={handleClickSearchButton}>
        <FiSearch size="16px" />
      </span>
    </div>
  );
};

export default Searchbar;
