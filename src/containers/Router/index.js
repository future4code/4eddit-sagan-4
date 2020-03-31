import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import Signup from "../Signup";
import Feed from "../Feed";

export const routes = {
  root: "/",
  signup: "/signup",
  feed: "/feed"
  // Outras rotas aqui
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={LoginPage} />
        <Route exact path={routes.signup} component={Signup} />
        <Route exact path={routes.feed} component={Feed} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
