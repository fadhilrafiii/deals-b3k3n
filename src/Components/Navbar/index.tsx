import React, { useRef } from 'react';

import { Link, useLocation } from 'react-router-dom';

import Hamburger from 'Components/Hamburger';
import Searchbar from 'Components/Searchbar';

import { Menu } from 'Shared/Types/Menu';

import styles from './index.module.css';

const CONST_MENU_LIST: Menu[] = [
  {
    name: 'My Books',
    path: '/',
  },
  {
    name: 'Books by Category',
    path: '/books',
  },
];

const Navbar = () => {
  const location = useLocation();

  const hamburgerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const actionClickHamburger = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle(styles.menuWrapperOpen);
    }

    if (hamburgerRef.current) {
      hamburgerRef.current.classList.toggle(styles.closeNavbarButton);
    }
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarWrapper}>
        <div className={styles.leftNavbar}>
          <div className={styles.logoWrapper}>
            <img alt="Deals Logo" src="/images/deals.svg" />
          </div>
          <div ref={menuRef} className={styles.menuWrapper}>
            {CONST_MENU_LIST.map(({ name, path }: Menu) => (
              <Link
                key={name}
                to={path}
                className={[
                  styles.menuItem,
                  location.pathname === path && styles.activeMenuItem,
                ].join(' ')}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.rightNavbar}>
          <div className={styles.searchbarWrapper}>
            <Searchbar />
          </div>
          <div className={styles.hamburgerWrapper} role="button" onClick={actionClickHamburger}>
            <Hamburger ref={hamburgerRef} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
