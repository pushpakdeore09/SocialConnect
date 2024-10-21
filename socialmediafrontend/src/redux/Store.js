import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./auth/auth.Reducer";
import { thunk } from "redux-thunk";
import { postReducer } from "./post/post.Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  post: postReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
