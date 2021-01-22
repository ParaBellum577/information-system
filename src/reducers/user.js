import {
  USER_SIGN_UP,
  USER_LOGIN_ERROR,
  CHANGE_PASSWORD,
  GET_USER_LIST,
  SET_ACCESS_TOKEN
} from '../actions/types';

const initialState = {
  user: {},
  error: {},
  userList: [],
  Token: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_UP:
      return {
        ...state,
        user: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case GET_USER_LIST:
      return {
        ...state,
        userList: action.payload,
      }
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        Token: action.payload,
      }
    default:
      return state;
  }
};
