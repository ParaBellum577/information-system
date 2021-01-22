import { GET_ALL_ISSUES_BY_SPRINT, GET_ALL_ISSUES_BY_PROJECT } from '../actions/types';
 
const initialState = {
  tasksBySprint: [],
  taskByProject: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ISSUES_BY_SPRINT:
      return {
        ...state,
        tasksBySprint: action.payload,
      };    
      case GET_ALL_ISSUES_BY_PROJECT:
      return {
        ...state,
        taskByProject: action.payload,
      };
    default:
      return state;
  }
};
  