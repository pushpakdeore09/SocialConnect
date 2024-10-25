import * as actionType from "./message.actionType";
import { api } from "../../config/api";

export const createMessage = (message) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_MESSAGE_REQUEST });
  try {
    const { data } = await api.post("/api/message", message);
    dispatch({ type: actionType.CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: actionType.CREATE_MESSAGE_FAILURE,
      payload: error,
    });
  }
};

export const createChat = () => async (dispatch) => {
  dispatch({ type: actionType.CREATE_CHAT_REQUEST });
  try {
    const { data } = await api.post('/api/chats');
    console.log("chat", data);
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
      console.log("get all chats", data);
      dispatch({ type: actionType.GET_ALL_CHATS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
  
      dispatch({
        type: actionType.GET_ALL_CHATS_FAILURE,
        payload: error,
      });
    }
  };
