import axios from 'axios';
import { GET_ALL_SPRINTS_BY_PROJECT } from './types';


export const createSprint = (data, id)  => async () => {
  try {
  await axios.post(
    `/api/sprint/createSprint`,
      data,
      { params: {id} }
  );
  } catch (error) {
    console.log('createSprint error:', error);
  }
};

export const updateSprint = (data, id)  => async () => {
  try {
  await axios.post(
    `/api/sprint/updateSprint`,
      data,
      { params: {id} }
  );
  } catch (error) {
    console.log('updateSprint error:', error);
  }
};

export const deleteSprint = (sprintId, id)  => async () => {
  try {
  await axios.post(
    `/api/sprint/deleteSprint`,
      {sprintId},
      { params: {id} }
  );
  } catch (error) {
    console.log('deleteSprint error:', error);
  }
};

export const showSprintAll = (data, id) => async dispatch => {
  try {
  const res = await axios.post(
    `/api/sprint/showSprintAll`,
    {projectId: data},
    { params: {id} }
  );
  dispatch({ 
      type: GET_ALL_SPRINTS_BY_PROJECT, 
      payload: res.data
  });
  } catch (error) {
    console.log('showSprintAll error:', error);
  }
};