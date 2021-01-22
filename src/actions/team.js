import axios from 'axios';
import { GET_MY_TEAMS } from './types';


export const showTeam = (data, id) => async () => {
  try {
    await axios.get(
      `/api/team/showTeam`,
      data,
      { params: { id } }
    );
  } catch (error) {
    console.log('createTask error:', error);
  }
};

export const changeTeamName = (data, id) => async () => {
  try {
    await axios.post(
      `/api/team/changeTeamName`,
      data,
      { params: { id } }
    );
  } catch (error) {
    console.log('changeTeamName error:', error);
  }
};

export const removeUser = (data, id) => async () => {
  try {
    await axios.post(
      `/api/team/removeUser`,
      data,
      { params: { id } }
    );
  } catch (error) {
    console.log('removeUser error:', error);
  }
};

export const addUser = (data, id) => async () => {
  try {
    await axios.post(
      `/api/team/addUser`,
      data,
      { params: { id } }
    );
  } catch (error) {
    console.log('addUser error:', error);
  }
};


export const getMyTeams = id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/team/getMyTeams`,
      { params: { id } }
    );
    dispatch({
      type: GET_MY_TEAMS,
      payload: res.data
    });
  } catch (error) {
    console.log('getMyTeams error:', error);
  }
};

