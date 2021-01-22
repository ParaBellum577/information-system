import axios from 'axios';
import { navigate } from '@reach/router';
import {
  USER_SIGN_UP,
  USER_LOGIN_ERROR,
  CHANGE_PASSWORD,
  GET_USER_LIST,
  SET_ACCESS_TOKEN
} from './types';


export const userLogin = data => async dispatch => {
  try {
    const res = await axios.post(
      `/api/auth/login`,
      data,
    );
    console.log("🚀 ~ file: user.js ~ line 18 ~ res", res)
    dispatch({
      type: USER_SIGN_UP,
      payload: res.data.user
    });
    dispatch({
      type: SET_ACCESS_TOKEN,
      payload: res.data.accessToken
    });
    dispatch({
      type: USER_LOGIN_ERROR,
      payload: {}
    });
    if (res.data.user.Role.roleName !== 'stakeholder') {
      localStorage.setItem('isUserStakeholder', false);
      navigate('/dashboard/projects');
    } else {
      localStorage.setItem('isUserStakeholder', true);
      navigate('/stakeholders/');
    }

    localStorage.setItem('currentUserId', res.data.user.id);
    localStorage.setItem('isLoginIn', true);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_ERROR,
      payload: error
    });
    console.log('userLogin error:', error);
  }
};

export const userSignUp = data => async dispatch => {
  try {
    const res = await axios.post(
      `/api/auth/register`,
      data,
    );
    dispatch({
      type: USER_SIGN_UP,
      payload: res.data.user
    });
    dispatch({
      type: SET_ACCESS_TOKEN,
      payload: res.data.accessToken
    });
    if (res.data.user.Role.roleName !== 'stakeholder') {
      localStorage.setItem('isUserStakeholder', false);
    } else {
      localStorage.setItem('isUserStakeholder', true);
    }
    localStorage.setItem('currentUserId', res.data.user.id);
    localStorage.setItem('isLoginIn', true);
  } catch (error) {
    console.log('userSignUp error:', error);
  }
};

export const clearUserData = () => async dispatch => {
  localStorage.removeItem('currentUserId');
  localStorage.removeItem('isUserStakeholder');

  localStorage.setItem('isLoginIn', false);
  dispatch({
    type: USER_SIGN_UP,
    payload: {}
  });
};


export const changePassword = data => async dispatch => {
  try {
    const res = await axios.post(
      `/api/stakeholder/changePassword`,
      data
    );
    dispatch({
      type: CHANGE_PASSWORD,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_ERROR,
      payload: error
    });
    console.log('changePassword error:', error);
  }
};

export const showUserList = data => async dispatch => {
  try {
    const res = await axios.get(
      `/api/user/showUserList`,
      {
        params: {
          id: data
        }
      }
    );
    dispatch({
      type: GET_USER_LIST,
      payload: res.data
    });
  } catch (error) {
    console.log('showUserList error:', error);
  }
};

export const uploadAvatar = (data, userId) => async dispatch => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/user/changeAvatar',
      data,
      processData: true,
      params: {
        id: userId
      }
    });
    dispatch({
      type: USER_SIGN_UP,
      payload: res.data
    });
  } catch (error) {
    console.log('changePassword error:', error);
  }
};

export const getUserInfo = data => async dispatch => {
  try {
    const res = await axios.get(
      `/api/user/getUserInfo`,
      {
        params: {
          id: data
        }
      }
    );
    dispatch({
      type: USER_SIGN_UP,
      payload: res.data
    });
    localStorage.setItem('currentUserId', res.data.user.id);
  } catch (error) {
    console.log('getUserInfo error:', error);
  }
};