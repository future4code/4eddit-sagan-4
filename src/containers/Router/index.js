import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import Signup from "../Signup";

export const routes = {
  root: "/",
  signup: "/signup"
  // Outras rotas aqui
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={LoginPage} />
        <Route exact path={routes.signup} component={Signup} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
