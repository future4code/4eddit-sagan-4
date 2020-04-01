import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import feed from "./feed"
import detailPost from './detailPost';

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    feed: feed,
    detailPost
    // Outros reducers aqui
  });
