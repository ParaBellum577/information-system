import React, { memo } from 'react';
import { navigate } from '@reach/router'
import Footer from './footer/index';
import Header from './header/index';
import { useTranslation } from 'react-i18next';
import styles from '../components/buttons.module.scss';
import style from '../components/main/authentication/index.module.scss';

const ErrorPage = function () {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className={style.emailConfirmPage}>
        <h1>404</h1>
        <h2>{t('This page does not exist')}</h2>
        <button onClick={() => navigate('/')} className={styles.buttonConfirm}>{t('To the main')}</button>
      </div>
      <Footer />
    </>
  )
}

export default memo(ErrorPage);