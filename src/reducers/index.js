import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import detailPost from './detailPost';

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    detailPost
    // Outros reducers aqui
  });
