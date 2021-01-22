import React, { memo, useState, useEffect } from 'react';
import _ from 'lodash'
import { navigate } from '@reach/router';
import { connect } from 'react-redux'
import { UncontrolledPopover, PopoverBody, PopoverHeader } from 'reactstrap';
import { clearUserData, getUserInfo, showUserList } from 'actions/user';
import LanguageChanger from 'common/languageChange';
import { AiOutlineHome } from "react-icons/ai";
import { RiDoorOpenLine } from "react-icons/ri";
import buttons from '../../../buttons.module.scss';
import styles from '../index.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
const actions = { clearUserData, getUserInfo };

const CabHeader = function ({ user, clearUserData, t, nameOfCab, getUserInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const userID = localStorage.getItem('currentUserId');
  useEffect(() => {
    getUserInfo(userID);
    showUserList(userID);
  }, []);

  const handleExit = () => {
    clearUserData();
    navigate('/');
  }
  const handleClosePopOver = () => {
    setIsOpen(false)
  }
  return (
    <>
      <div className={styles.cabHeader}>
        <button onClick={() => navigate("/")} className={buttons.buttonSignIn}>{t("Home Page")}</button>
        <AiOutlineHome onClick={() => navigate("/")} className={styles.iconHome} />
        {
          !_.isEmpty(user) &&
          <>
          {/* <img src={user.avatar} alt="avatar"/> */}
            <div id="profile" onClick={() => setIsOpen(!isOpen)} className={styles.stName}>{user && user.firstName[0].toUpperCase()}</div>
            <UncontrolledPopover
              trigger="click"
              placement='bottom'
              target="profile"
              className={styles.popoverProfile}
              isOpen={isOpen}
            >
              <PopoverHeader onClick={() => { 
                nameOfCab === 'stakeholders' ?
                navigate("/stakeholders/profile-settings/")
                : navigate("/dashboard/profile-settings/");
                handleClosePopOver();
              }} 
                className={styles.popoverHeader}
              >
                <div className={styles.profileHeader}>
                  <div className={styles.profileHeaderAvatar}>
                    <div className={styles.stName}>{user && user.firstName[0].toUpperCase()}</div>
                  </div>
                  <div className={styles.headerName}>
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                    <div>{t('Edit profile')}</div>
                  </div>
                </div>
              </PopoverHeader>
              <PopoverBody className={styles.popoverBody}>
                <ul>
                  <li onClick={handleClosePopOver}><div>Які-небудь пункти меню</div></li>
                  <li onClick={handleClosePopOver}><div>Які-небудь пункти меню</div></li>
                  <li onClick={handleClosePopOver}><div>Які-небудь пункти меню</div></li>
                  <li onClick={handleExit} className={styles.logOut}><div >{t('Log Out')}<RiDoorOpenLine size="20"/></div></li>
                </ul>
              </PopoverBody>
            </UncontrolledPopover>
          </>
        }
        <LanguageChanger />
      </div>
      {/* <ReactTooltip /> */}
    </>
  )
}

export default memo(connect(null, actions)(CabHeader));