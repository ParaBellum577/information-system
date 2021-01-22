import React,{ memo } from 'react';
import Footer from '../../components/footer/index';
import Header from '../../components/header/index';
import buttons from '../../components/buttons.module.scss';
import style from '../main/authentication/index.module.scss'
import { useTranslation } from 'react-i18next';
import {navigate} from '@reach/router'

const ErrorPage = function () {
const {t} = useTranslation();
  return(
      <>
        <Header/>
          <div className={style.emailConfirmPage}>
            <h2>{t('This page is under development')}</h2>
            <button onClick={() => navigate('/')} className={buttons.buttonConfirm}>{t('To the main')}</button>
          </div>
        <Footer />
      </>
    )
}

export default memo(ErrorPage);