import { GET_EQUIPMENT } from '../actions/types';
 
const initialState = {
  equipment: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EQUIPMENT:
      return {
        ...state,
        equipment: action.payload,
      };
    default:
      return state;
  }
};
  