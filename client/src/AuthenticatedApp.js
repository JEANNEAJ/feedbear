import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Dashboard from "./components/pages/Dashboard";
import ProjectDetails from "./components/pages/ProjectDetails";
import UserPage from "./components/pages/UserPage";
import UpdateProject from "./components/pages/UpdateProject";
import ContactPage from "./components/pages/ContactPage";
import ProjectForm from "./components/forms/ProjectForm";

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/project/new" render={() => <ProjectForm headingText="Add Project"/>} />
      <Route exact path="/project/:projectId" component={ProjectDetails} />
      <Route exact path="/user/:userId" component={UserPage} />
      <Route exact path="/edit/:projectId" component={UpdateProject} />
      <Route exact path={'/contact'} component={ContactPage} />
      <Redirect to="/" />
    </Switch>
  );
};

export default AuthenticatedApp;
