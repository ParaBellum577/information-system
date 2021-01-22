import React, { memo, useState, useEffect } from 'react';
import styles from './index.module.scss';
import { Link } from '@reach/router';
import { 
  BiShoppingBag, 
  BiGroup, 
  BiGridAlt, 
  BiMessageRoundedDots, 
  BiUserCircle, 
  BiArchive, 
  BiTrim 
} from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const NavBar = function () {
  const { t } = useTranslation();
  const isActive = ({isPartiallyCurrent}) => {
    return isPartiallyCurrent ? { className: "active-tab" } : {}
  }
  return (
    <>
      <div className={styles.sideBar}>
        <div className={styles.headerLogo}></div>
        <div className={styles.sideBarElement}>
          <Link
            title={t('Message')}
            to="/dashboard/messenger/"
            getProps={isActive}
          >
            <BiMessageRoundedDots size="25" />
            <span>{t('Message')}</span>
          </Link>
          <Link
            title={t("Projects")}
            to="/dashboard/projects/"
            getProps={isActive}
          >
            <BiShoppingBag size="25" />
            <span>{t("Projects")}</span>
          </Link>
          <Link
            title={t("Teams")}
            to="/dashboard/teams/"
            getProps={isActive}
          >
            <BiGroup size="25" />
            <span>{t("Teams")}</span>
          </Link>
          <Link
            title={t("Laboratory")}
            to="/dashboard/laboratory/"
            getProps={isActive}
          >
            <BiGridAlt size="25" />
            <span>{t("Laboratory")}</span>
          </Link>
          <Link
            getProps={isActive}
            title={t("Users")}
            to="/dashboard/approve-users/"
          >
            <BiUserCircle size="25" />
            <span>{t("Users")}</span>
          </Link>
          <Link
            getProps={isActive}
            title={t("Stakeholders requests")}
            to="/dashboard/approve-app/"
          >
            <BiArchive size="25" />
            <span>{t("Stakeholders requests")}</span>
          </Link>
          {/* <Link
            getProps={isActive}
            title={t("Competences")}
            to="/dashboard/competences/"
          >
            <BiTrim size="25" />
            <span>{t("Competences")}</span>
          </Link> */}
        </div>
      </div>
    </>
  )
}

export default memo(NavBar);