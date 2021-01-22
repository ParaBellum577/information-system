import axios from 'axios';
import {
  CREATE_CHAT,
  SHOW_CHAT_LIST,
  CREATE_MESSAGE,
  SHOW_ALL_MESSAGE
} from './types';


export const createChat = data => async dispatch => {
  //   creator: integer,
  //   users: [integer],
  try {
    const res = await axios.post(
      `/api/chat/createChat`,
      data,
      {
        params: {
          id: data.creator
        }
      }
    );
    dispatch({
      type: CREATE_CHAT,
      payload: res.data
    });
  } catch (error) {
    console.log('createChat error:', error);
  }
};
export const showChatList = id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/chat/showChatList`,
      {
        params: {
          id
        }
      }
    );
    dispatch({
      type: SHOW_CHAT_LIST,
      payload: res.data
    });
  } catch (error) {
    console.log('showChatList error:', error);
  }
};

export const createMessage = (data, id) => async dispatch => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/message/createMessage',
      data,
      processData: true,
      params: {
        id
      }
    });
    dispatch({
      type: CREATE_MESSAGE,
      payload: res
    });
  } catch (error) {
    console.log('createMessage error:', error);
  }
};

export const showMessageAll = (chatRoomId, id) => async dispatch => {
  // chatRoomId: integer,
  try {
    const res = await axios.post(
      `/api/message/showMessageAll`,
      { chatRoomId },
      {
        params: {
          id
        }
      }
    );
    dispatch({
      type: SHOW_ALL_MESSAGE,
      payload: res
    });
  } catch (error) {
    console.log('showMessageAll error:', error);
  }
};