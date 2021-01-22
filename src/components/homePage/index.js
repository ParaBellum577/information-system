import React,{ memo } from 'react';
import styles from './index.module.scss';
import Header from '../header/index';
import Footer from '../footer/index';
import FirstBlock from './firstBlock/index';
import SecondBlock from './secondBlock/index';
import ThirdBlock from './thirdBlock/index';

const HomePage = function () {
  return(
      <>
        <div className={styles.main}>
            <Header />
            <FirstBlock />
            <SecondBlock />
            <ThirdBlock />
            <Footer />
        </div>
      </>
    )
}

export default memo(HomePage);