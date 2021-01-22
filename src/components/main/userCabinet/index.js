import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { navigate } from '@reach/router';
import { getUserInfo } from 'actions/user';
import SideBar from './sideBar/index';
import CabHeader from '../stakeholders/cabinHeader.js/index.js';
import CustomLoader from '../../common/customLoader';

const mapStateToProps = ({ user }) => ({ user });
const actions = { getUserInfo };

const StakeHolders = function ({ user, children, getUserInfo }) {
  const userID = localStorage.getItem('currentUserId');
  const isLoginIn = JSON.parse(localStorage.getItem('isLoginIn'));
  const isUserStakeholder = JSON.parse(localStorage.getItem('isUserStakeholder'));
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const userDataVerify = async () => {
    if(userID) {
      await getUserInfo(userID);
    }
    if(isLoginIn && isUserStakeholder || !isLoginIn) {
      navigate('/');
    }
  }
  useEffect(() => {
    userDataVerify();
  }, []);

  useEffect(() => {
    if (Object.keys(user.user).length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [user]);
  return (
    <>
      {
      isLoading ? <div style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center'
      }}><CustomLoader /></div> :
        <>
          <SideBar />
          <div id="user-main">
            <CabHeader nameOfCab="dashboard" t={t} user={user.user} />
            <div className="wrapper">
              <div>
                {children}
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default memo(connect(mapStateToProps, actions)(StakeHolders));