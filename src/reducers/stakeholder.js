import { STAKEHOLDER_CREATE, GET_STAKEHOLDERS_REQUESTS } from '../actions/types';

const initialState = {
  stakeholderData: {},
  requests: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case STAKEHOLDER_CREATE:
      return {
        ...state,
        stakeholderData: action.payload,
      };
    case GET_STAKEHOLDERS_REQUESTS:
      return {
        ...state,
        requests: action.payload,
      };
    default:
      return state;
  }
};