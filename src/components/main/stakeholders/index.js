import React,{ useEffect, useState, memo } from 'react';
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { navigate } from '@reach/router';
import SideBar from '../sideBar/index';
import CabHeader from './cabinHeader.js';
import CustomLoader from '../../common/customLoader';

const mapStateToProps = ({ user }) => ({ user });

const StakeHolders = function({ user, children }) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const isUserStakeholder = JSON.parse(localStorage.getItem('isUserStakeholder'));

  useEffect(() => {
    if(Object.keys(user.user).length === 0 || !isUserStakeholder) {
      navigate('/')
    }
    if(_.isEmpty(user)) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return(
      <>
      {/* <CustomLoader /> */}
      <SideBar />
      <div id="main">
        <CabHeader nameOfCab="stakeholders" t={t} user={user.user}/>
        {isLoading ? <CustomLoader color="#30B4AE"/> :
          <div className="wrapper">
            {children}
          </div>
        }
      </div>
      </>
    )
}

export default memo(connect(mapStateToProps)(StakeHolders));