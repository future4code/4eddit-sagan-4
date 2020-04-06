import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import menu from "./menu";
import posts from "./posts";

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    posts,
    menu
  });
