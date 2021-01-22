import axios from 'axios';
import { GET_ALL_PROJECTS } from './types';

export const showProjectAllForCreator = id => async dispatch => {
  try {
    const res = await axios.get(
        `/api/project/showProjectAllForCreator`,
        {
          params: {
            id
          }
        }
    );
  dispatch({ 
      type: GET_ALL_PROJECTS,
      payload: res.data
  });
  } catch (error) {
    console.log('showProjectAllForCreator error:', error);
  }
};

export const projectStart = (projectId, id)=> async () => {
  try {
    await axios.post(
        `/api/project/projectStart`,{projectId}, {params: {id}});
  } catch (error) {
    console.log('projectStart error:', error);
  }
};

export const projectFinish = (projectId, id)=> async () => {
  try {
    await axios.post(
        `/api/project/projectFinish`,{projectId}, {params: {id}});
  } catch (error) {
    console.log('projectFinish error:', error);
  }
};