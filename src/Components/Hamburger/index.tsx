import React, { forwardRef, Ref } from 'react';

import styles from './index.module.css';

const Hamburger = forwardRef((_: unknown, ref: Ref<HTMLDivElement>) => {
  return (
    <div className={styles.hamburger} ref={ref}>
      <span />
      <span />
      <span />
    </div>
  );
});

export default Hamburger;
