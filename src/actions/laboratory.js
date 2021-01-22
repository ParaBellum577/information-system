import axios from 'axios';
import { GET_ALL_LABORATORY } from './types';


export const showLaboratoryAll = id => async dispatch => {
  try {
  const res = await axios.get(
    `/api/laboratory/showLaboratoryAll`,
    { params: {id} }
  );
  dispatch({ 
      type: GET_ALL_LABORATORY, 
      payload: res.data
  });
  } catch (error) {
    console.log('showLaboratoryAll error:', error);
  }
};

export const createLaboratory = (data, id) => async () => {
    try {
    await axios.post(
      `/api/laboratory/createLaboratory`,
      data,
      { params: {id} }
    );
    } catch (error) {
      console.log('createLaboratory error:', error);
    }
  };

  export const deleteLaboratory = (laboratoryId, id) => async () => {
    try {
    await axios.post(
      `/api/laboratory/deleteLaboratory`,
      {laboratoryId },
      { params: {id} }
    );
    } catch (error) {
      console.log('deleteLaboratory error:', error);
    }
  };

  export const updateLaboratory = (data, id) => async () => {
    try {
    await axios.post(
      `/api/laboratory/updateLaboratory`,
      data,
      { params: {id} }
    );
    } catch (error) {
      console.log('updateLaboratory error:', error);
    }
  };