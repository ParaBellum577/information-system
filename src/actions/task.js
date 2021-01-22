import axios from 'axios';
import { GET_ALL_ISSUES_BY_SPRINT, GET_ALL_ISSUES_BY_PROJECT } from './types';


export const createTask = (data, id) => async () => {
  try {
    await axios.post(`/api/task/createTask`, data, { params: { id } });
  } catch (error) {
    console.log('createTask error:', error);
  }
};

export const joinTaskToSprint = (data, id) => async () => {
  try {
    await axios.post(`/api/task/joinTaskToSprint`, data, { params: { id } });
  } catch (error) {
    console.log('joinTaskToSprint error:', error);
  }
};

export const deleteTask = (taskId, id) => async () => {
  try {
    await axios.post(`/api/task/deleteTask`,  {taskId}, { params: { id } });
  } catch (error) {
    console.log('deleteTask error:', error);
  }
};

export const updateTask = (taskId, data, id) => async () => {
  try {
    await axios.post(
      `/api/task/updateTask`,
      {
        taskId,
        changedField: data
      },
      { params: { id } }
    );
  } catch (error) {
    console.log('updateTask error:', error);
  }
};

export const showTaskAllInSprint = (data, id) => async dispatch => {
  try {
    const res = await axios.post(
      `/api/task/showTaskAllInSprint`,
      { sprintId: data },
      { params: { id } }
    );
    dispatch({
      type: GET_ALL_ISSUES_BY_SPRINT,
      payload: res.data
    });
  } catch (error) {
    console.log('showTaskAllInSprint error:', error);
  }
};

export const showTaskAllInProject = (data, id) => async dispatch => {
  try {
    const res = await axios.post(
      `/api/task/showTaskAllInProject`,
      { projectId: data },
      { params: { id } }
    );
    dispatch({
      type: GET_ALL_ISSUES_BY_PROJECT,
      payload: res.data
    });
  } catch (error) {
    console.log('showTaskAllInProject error:', error);
  }
};