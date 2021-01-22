import axios from 'axios';
import { GET_STAKEHOLDERS_REQUESTS, STAKEHOLDER_CREATE } from './types';


export const stakeholderCreate = (data, id) => async dispatch => {
  try {
  const res = await axios.post(
    `/api/stakeholder/create`,
      data,
      { params: { id } }
  );
  dispatch({ 
      type: STAKEHOLDER_CREATE, 
      payload: res
  });
  } catch (error) {
    console.log('stakeholderCreate error:', error);
  }
};

export const showStakeholderQueryAll = id => async dispatch => {
  try {
  const res = await axios.get(`/api/stakeholder/showStakeholderQueryAll`, { params: { id } });
  dispatch({ 
      type: GET_STAKEHOLDERS_REQUESTS, 
      payload: res.data
  });
  } catch (error) {
    console.log('showStakeholderQueryAll error:', error);
  }
};

export const showAcceptedStakeholderQueryAll = id => async dispatch => {
  try {
  const res = await axios.get(`/api/stakeholder/showAcceptedStakeholderQueryAll`, { params: { id } });
  dispatch({ 
      type: GET_STAKEHOLDERS_REQUESTS, 
      payload: res.data
  });
  } catch (error) {
    console.log('showAcceptedStakeholderQueryAll error:', error);
  }
};

export const queryConfirm = (stakeholderQueryId, id) => async () => {
  try {
  await axios.post(`/api/stakeholder/queryConfirm`, { stakeholderQueryId }, { params: { id } });
  } catch (error) {
    console.log('queryConfirm error:', error);
  }
};

export const queryDecline = (data, id) => async () => {
  try {
  await axios.post(`/api/stakeholder/queryDecline`, data, { params: { id } });
  } catch (error) {
    console.log('queryDecline error:', error);
  }
};

export const changeUserRole = (data, id) => async () => {
  try {
  await axios.post(`/api/stakeholder/changeUserRole`, data,  { params: { id } });
  } catch (error) {
    console.log('changeUserRole error:', error);
  }
};

export const userConfirm = (userId, id) => async () => {
  try {
  await axios.post(`/api/stakeholder/userConfirm`, { userId }, { params: { id } });
  } catch (error) {
    console.log('userConfirm error:', error);
  }
};

export const userDecline = (userId, id) => async () => {
  try {
  await axios.post(`/api/stakeholder/userDecline`, { userId }, { params: { id } });
  } catch (error) {
    console.log('userDecline error:', error);
  }
};