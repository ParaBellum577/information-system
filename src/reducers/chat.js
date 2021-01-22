import {
  CREATE_CHAT,
  SHOW_CHAT_LIST,
  SHOW_ALL_MESSAGE
} from 'actions/types';

const initialState = {
  chat: [],
  chatList: [],
  chatMessages: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHAT:
      return {
        ...state,
        chat: action.payload,
      };
    case SHOW_CHAT_LIST:
      return {
        ...state,
        chatList: action.payload,
      };
    case SHOW_ALL_MESSAGE:
      return {
        ...state,
        chatMessages: action.payload,
      };
    default:
      return state;
  }
};
