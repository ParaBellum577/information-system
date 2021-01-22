import React from 'react';
import { Link, navigate, useLocation } from '@reach/router';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LoginPopUp from '../main/popUps/login';
import LangChanger from '../common/languageChange';
import Hamburger from 'hamburger-react'
import styles from './index.module.scss';
import buttons from '../../components/buttons.module.scss';

const mapStateToProps = ({ user }) => ({ user });

const Header = function ({ user }) {
  const isLoginIn = JSON.parse(localStorage.getItem('isLoginIn'));
  const isUserStakeholder = JSON.parse(localStorage.getItem('isUserStakeholder'));
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState('');
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isHamburgerOpen, setHamburgerOpen] = React.useState(false)
  const styleMobile = {
    transform: 'translateX(0)',
    visibility: 'visible'
  };
  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: "active-tab-header" } : {}
  }
  const redirectLink = () => {
    if(isUserStakeholder) {
      navigate("/stakeholders/");
    } else {
      navigate("/dashboard/projects/");
    }
  }
  const handeOpenLogin = value => {
    setIsLoginOpen(value);
  }
  const listenWidth = () => {
    if (document.body.clientWidth > 1326) {
      handleCloseMenu();
    }
  }

  React.useEffect(() => {
    document.addEventListener("resize", listenWidth);
    return () => {
      document.removeEventListener("resize", listenWidth);
    };
  }, [listenWidth]);

  const handleCloseMenu = tab => {
    setHamburgerOpen(false);
    setActiveTab(tab);
  }

  return (
    <>
      <div className={styles.header}>
        <Hamburger toggled={isHamburgerOpen} toggle={setHamburgerOpen} />
        <div className={styles.mobileLayout} style={isHamburgerOpen ? styleMobile : {}}>
          <div className={styles.navigation}>
            <ul>
              <li>
                <div onClick={handleCloseMenu}>
                  <Link  to='/' >{t('Home')}</Link>
                </div>
              </li>
              <li>
                <div onClick={handleCloseMenu}>
                  <Link  to='/equipment/' >{t("Equipment")}</Link>
                </div>
              </li>
              <li>
                <div onClick={handleCloseMenu}>
                  <Link to='/develop-page/' >{t("Implemented projects")}</Link>
                </div>
              </li>
              {/* <li>
                <div onClick={handleCloseMenu}>
                  <Link to='/develop-page/' >{t("News")}</Link>
                </div>
              </li>                 */}
              <li>
                <div onClick={handleCloseMenu}>
                  <Link  to='/stakeholders-requests/' >{t("Stakeholders requests")}</Link>
                </div>
              </li>
              <li>
                <div onClick={handleCloseMenu}>
                  <Link to='/develop-page/' >{t("Calendar plan")}</Link>
                </div>
              </li>
              <li>
                <div onClick={handleCloseMenu}>
                  <Link to='/develop-page/' >{t("Contacts")}</Link>
                </div>
              </li>
            </ul>
            <div className={styles.buttons}>
              {
                !isLoginIn
                  ?
                  <>
                    <button className={buttons.buttonSignIn} onClick={() => navigate("/sign-up/")}>{t("Sign Up")}</button>
                    <button onClick={() => handeOpenLogin(true)} className={buttons.buttonConfirm}>{t("Login")}</button>
                  </>
                  :
                  <button onClick={redirectLink} className={buttons.buttonConfirm}>{t("To the office")}</button>
              }
            </div>
            <div>
              <LangChanger />
            </div>
          </div>
        </div>
        <nav>
          <Link getProps={isActive} to='/' >{t('Home')}</Link>
          <Link getProps={isActive} to='/equipment/' >{t("Equipment")}</Link>
          <Link getProps={isActive} to='/develop-page/' >{t("Implemented projects")}</Link>
          <Link getProps={isActive} to='/stakeholders-requests/' >{t("Stakeholders requests")}</Link>
          {/* <Link to='/develop-page/' >{t("News")}</Link> */}
          <Link  to='/develop-page/' >{t("Calendar plan")}</Link>
          <Link  to='/develop-page/' >{t("Contacts")}</Link>
        </nav>
        <div className={styles.buttonsGroup}>
          {
            !isLoginIn
              ?
              <>
                <button className={buttons.buttonSignIn} onClick={() => navigate("/sign-up/")}>{t("Sign Up")}</button>
                <button onClick={() => handeOpenLogin(true)} className={buttons.buttonConfirm}>{t("Login")}</button>
              </>
              :
              <button onClick={redirectLink} className={buttons.buttonConfirm}>{t("To the office")}</button>
          }
          <LangChanger />
        </div>
        <LoginPopUp t={t} handeOpenLogin={handeOpenLogin} isLoginOpen={isLoginOpen} />
      </div>
    </>
  )
}


export default React.memo(connect(mapStateToProps)(Header));
