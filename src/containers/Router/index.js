import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import DetailPostPage from "../DetailPostPage";
import Signup from "../Signup";
import Feed from "../Feed";

export const routes = {
  root: "/",
  login: "/login",
  signup: "/signup",
  feed: "/feed",
  detailPost: "/detail-post"
  // Outras rotas aqui
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={Feed} />
        <Route exact path={routes.login} component={LoginPage} />
        <Route exact path={routes.signup} component={Signup} />
        <Route exact path={routes.feed} component={Feed} />
        <Route exact path={routes.detailPost} component={DetailPostPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
