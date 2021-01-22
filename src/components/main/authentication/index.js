import React,{ memo } from 'react';
import Login from './login'

const LoginPage = function () {
  return(
      <>
         <Login />
      </>
    )
}

export default memo(LoginPage);