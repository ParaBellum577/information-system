import React, { memo, useEffect } from 'react';
import { navigate } from "@reach/router"
import axios from 'axios';
import { useTranslation } from 'react-i18next';
// import API_URL from '../../../ApiUrl';
import Footer from '../../footer/index';
import Header from '../../header/index';
import styles from '../../buttons.module.scss';
import style from '../../main/authentication/index.module.scss';

const EmailConfirm = function (props) {
  // const [error, setError] = useState('')
  const {t} = useTranslation();
  const verifyUser = async () => {
    try {
      const id = props.id;
      const secretCode = props.secretCode;
      await axios.post(
        // `${API_URL.API_URL}/api/stakeholder/verify`,
        '/api/stakeholder/verify',
        {id, secretCode},
      );
    } catch (error) {
      // setError(error);
      console.log('userVerifyMail error:', error);
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      <Header />
      <div className={style.emailConfirmPage}>
        <h2>{t('Your email has been successfully verified!')}</h2>
        <button onClick={() => navigate('/')} className={styles.buttonConfirm}>{t('To the main')}</button>
      </div>
      <Footer />
    </>
  )
}

export default memo(EmailConfirm);