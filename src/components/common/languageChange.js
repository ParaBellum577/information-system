import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../header/index.module.scss'
import en from '../style/icons/US.svg';
import ua from '../style/icons/UA.svg';

const LangChanger = function () {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = React.useState(i18n.language);

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  return(
    <>
    <div className={styles.langChanger} onClick={() => changeLanguage('en')}>
          <img src={en} alt="language en"/>
    </div>    
    <div className={styles.langChanger} onClick={() => changeLanguage('ua')}>
          <img src={ua} alt="language ua"/>
    </div>
    </>
    )
}

export default LangChanger;