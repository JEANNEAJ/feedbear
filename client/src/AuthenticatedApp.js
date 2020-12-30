import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Dashboard from "./components/pages/Dashboard";
import ProjectDetails from "./components/pages/ProjectDetails";
import UserPage from "./components/pages/UserPage";
import UpdateProject from "./components/pages/UpdateProject";

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/project/:projectId" component={ProjectDetails} />
      <Route exact path="/user/:userId" component={UserPage} />
      <Route exact path="/edit/:projectId" component={UpdateProject} />
      <Redirect to="/" />
    </Switch>
  );
};

export default AuthenticatedApp;
