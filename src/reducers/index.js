import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import feed from "./feed"

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    feed: feed
    // Outros reducers aqui
  });
