import React from 'react';
import { navigate, Link } from 'gatsby';
import styles from './index.module.scss';
// import LangChanger from '../common/languageChange';
import LoginPopUp from '../main/popUps/login';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import logo1 from '../style/1.png';
import logo2 from '../style/2.png';
import logo3 from '../style/3.png';
import logo4 from '../style/4.png';




const mapStateToProps = ({ user }) => ({ user });

const Footer = function ({ user }) {
  const { t } = useTranslation();
  const [isButtonSignUp, setIsButtonSignUp] = React.useState(true);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);

  React.useEffect(() => {
    if (Object.keys(user.user).length !== 0) {
      setIsButtonSignUp(false);
    } else {
      setIsButtonSignUp(true);
    }
  });

  const handeOpenCabinet = () => {
    if (user.user.Role.roleName === 'stakeholder') {
      navigate("/stakeholders/");
    } else {
      navigate("/dashboard/projects");
    }
  }

  const handeOpenLogin = value => {
    setIsLoginOpen(value);
  }
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footerLogoBack}>
          <div className={styles.footerContent}>
            <div className={styles.footerInfo}>
              <div>
                <span>{t('Sitemap')}</span>
                <div className={styles.infoElements}>
                  <Link to='/'>{t('Home')}</Link>
                  <Link to='/equipment/'>{t("Equipment")}</Link>
                  <Link to='/develop-page/'>{t("Implemented projects")}</Link>
                  <Link to='/stakeholders-requests/' >{t("Stakeholders requests")}</Link>
                  <Link to='/develop-page/'>{t("Calendar plan")}</Link>
                  <Link to='/develop-page/'>{t("Contacts")}</Link>
                </div>
              </div>
              {
                isButtonSignUp ?
                  <div className={`${styles.infoElements} ${styles.infoElementsMarg}`}>
                    <div onClick={() => navigate('/sign-up/')}>{t("Sign Up")}</div>
                    <div onClick={() => handeOpenLogin(true)}>{t("Login")}</div>
                    {/* <LangChanger /> */}
                  </div>
                  :
                  <div className={`${styles.infoElements} ${styles.infoElementsMarg}`}>
                    <div onClick={handeOpenCabinet} >{t("To the office")}</div>
                  </div>
              }
              {/* <LangChanger /> */}
            </div>
            <div className={styles.social}>
              {/* <div className={styles.europeanUnion}>
                <img src={europe} alt="europeanUnion" />
                <span>«This project is funded by the EuropeanUnion»</span>
              </div>
              <div>
                <a href="/"><img src={icon1} alt="social" /></a>
                <a href="/"><img src={icon2} alt="social" /></a>
                <a href="/"><img src={icon3} alt="social" /></a>
                <a href="/"><img src={icon4} alt="social" /></a>
                <a href="/"><img src={icon5} alt="social" /></a>
                <a href="/"><img src={icon6} alt="social" /></a>
              </div>
              <a href="http://ec.europa.eu/europeaid/index_en.html">http://ec.europa.eu/europeaid</a>
              <a href="http://www.ro-ua.ro-ua-md.net/en/">http://www.ro-ua.ro-ua-md.net</a> */}
            </div>
          </div>
        </div>
        <div className={styles.whiteBack}>
          <div>
            <img src={logo1} alt="logo" />
            <img src={logo2} alt="logo" />
            <img src={logo3} alt="logo" />
            <img src={logo4} alt="logo" />
          </div>
        </div>
        <span className={styles.rights} >© {new Date().getFullYear()}. All rights reserved.</span>
      </div>
      <LoginPopUp t={t} handeOpenLogin={handeOpenLogin} isLoginOpen={isLoginOpen} />
    </>
  )
}


export default React.memo(connect(mapStateToProps)(Footer));
