import { GET_ALL_PROJECTS } from '../actions/types';
 
const initialState = {
  projectList: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECTS:
      return {
        ...state,
        projectList: action.payload,
      };
    default:
      return state;
  }
};
  