import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import DetailPostPage from "../DetailPostPage";

export const routes = {
  root: "/",
  detailPost: "/detail-post"
  // Outras rotas aqui
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={LoginPage} />
        <Route exact path={routes.detailPost} component={DetailPostPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
