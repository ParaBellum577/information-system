import React,{ memo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import img from '../../style/second.png';

const FirstBlock = function () {
  const { t } = useTranslation();
  return(
      <>
        <div className={styles.main}>
          <div>
            <div>
              <img src={img} alt="img"/>
            </div>
            <div className={styles.blockText}>
              <h1>{t('Laboratory')}</h1>
              <p>{t('Creation of the hardware')}</p>
            </div>
          </div>
        </div>
      </>
    )
}

export default memo(FirstBlock);