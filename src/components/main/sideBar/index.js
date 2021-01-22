import React,{ memo } from 'react';
import styles from './index.module.scss';
import { navigate, useLocation  } from '@reach/router';

import img from '../../style/laboratory-reg.png';

const NavBar = function () {
  const location = useLocation();
  return(
      <>
      <div className={styles.sideBar}>
        <img onClick={() => location.pathname === '/stakeholders/' ? navigate('/stakeholders/messenger') : navigate('/stakeholders/')} src={img} alt="lab"/>
        {/* <div className={styles.headerLogo}>
              <Link to='/'><img className={styles.logo} alt='duefocus' src={logo}/></Link>
        </div> */}
        {/* <Link className={styles.sideBarElement} to="/">
          <div>
            <img src={icon} alt="icon"/>
            <span>Home</span>
          </div>
        </Link> */}
        {/* <Link className={styles.sideBarElement} to="/">
          <div>
            <i className="fas fa-utensils"></i>
            <span>Other</span>
          </div>
        </Link> */}
      </div>
      </>
    )
}

export default memo(NavBar);