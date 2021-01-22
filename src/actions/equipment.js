import axios from 'axios';
import { GET_EQUIPMENT } from './types';

export const getEquipment = () => async dispatch => {
  try {
    const res = await axios.get(`/api/equipment/showEquipments`);
  dispatch({ 
      type: GET_EQUIPMENT, 
      payload: res.data
  });
  } catch (error) {
    console.log('getEquipment error:', error);
  }
};
