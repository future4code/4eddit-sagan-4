import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import feed from "./feed";
import detailPost from './detailPost';
import menu from "./menu"

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    feed,
    detailPost,
    menu
    // Outros reducers aqui
  });
