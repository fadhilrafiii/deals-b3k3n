import React from 'react';

import Lottie from 'react-lottie';

import lottieFile from './book_loading.json';

import styles from './index.module.css';

const LoadingPage = React.memo(() => {
  return (
    <div className={styles.container}>
      <Lottie
        height={300}
        width={300}
        options={{
          loop: true,
          autoplay: true,
          animationData: lottieFile,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
      />
    </div>
  );
});

export default LoadingPage;
