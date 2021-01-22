import { GET_MY_TEAMS } from '../actions/types';
 
const initialState = {
    myTeams: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_TEAMS:
      return {
        ...state,
        myTeams: action.payload,
      };    
    default:
      return state;
  }
};
  