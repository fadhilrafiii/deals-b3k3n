import React, { ReactNode } from 'react';

import { RiArrowLeftSLine } from '@react-icons/all-files/ri/RiArrowLeftSLine';
import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine';

import styles from './index.module.css';

interface SliderProps {
  shouldShowArrow?: boolean;
  children: ReactNode[] | ReactNode;
}

const Slider: React.FC<SliderProps> = ({ shouldShowArrow = false, children }: SliderProps) => {
  return (
    <div className={styles.slider}>
      {shouldShowArrow && (
        <span role="button" className={styles.lefttArrow}>
          <RiArrowLeftSLine />
        </span>
      )}
      <div className={styles.sliderTrack}>{children}</div>
      {shouldShowArrow && (
        <span role="button" className={styles.rightArrow}>
          <RiArrowRightSLine />
        </span>
      )}
    </div>
  );
};

export default Slider;
