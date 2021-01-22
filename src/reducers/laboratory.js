import { GET_ALL_LABORATORY } from '../actions/types';
 
const initialState = {
  laboratories: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LABORATORY:
      return {
        ...state,
        laboratories: action.payload,
      };
    default:
      return state;
  }
};
  