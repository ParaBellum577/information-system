import React,{ memo } from 'react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import img from '../../style/fst.png';

const FirstBlock = function () {
  const { t } = useTranslation();
  return(
      <>
        <div className={styles.main}>
          <div className={styles.blockText}>
            <h1>{t('About the project')}</h1>
            <p>{t('Creation of the hardware')}</p>
          </div>
          <div>
            <img src={img} alt="img"/>
          </div>
        </div>
      </>
    )
}

export default memo(FirstBlock);