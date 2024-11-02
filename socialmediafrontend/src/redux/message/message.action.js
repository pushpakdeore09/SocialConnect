import * as actionType from "./message.actionType";
import { api } from "../../config/api";

export const createMessage = (reqData) => async (dispatch) => {
  
  dispatch({ type: actionType.CREATE_MESSAGE_REQUEST });
  try {
    const { data } = await api.post(`/api/messages/chat/${reqData.message.chatId}`, reqData.message);
    reqData.sendMessageToServer(data);
    dispatch({ type: actionType.CREATE_MESSAGE_SUCCESS, payload: data });
    
  } catch (error) {
    console.log(error);

    dispatch({
      type: actionType.CREATE_MESSAGE_FAILURE,
      payload: error,
    });
  }
};

export const createChat = (chat) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_CHAT_REQUEST });
  try {
    const { data } = await api.post('/api/chats', chat);
    dispatch({ type: actionType.CREATE_CHAT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: actionType.CREATE_CHAT_FAILURE,
      payload: error,
    });
  }
};

export const getAllChats = () => async (dispatch) => {
    dispatch({ type: actionType.GET_ALL_CHATS_REQUEST });
    try {
      const { data } = await api.get('/api/user/chats');
      dispatch({ type: actionType.GET_ALL_CHATS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
  
      dispatch({
        type: actionType.GET_ALL_CHATS_FAILURE,
        payload: error,
      });
    }
  };
