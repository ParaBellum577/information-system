import { GET_ALL_COMPETENCES } from 'actions/types';
 
const initialState = {
  competencesList: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMPETENCES:
      return {
        ...state,
        competencesList: action.payload,
      };
    default:
      return state;
  }
};
  