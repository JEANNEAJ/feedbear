import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Dashboard from "./components/pages/Dashboard";
import FeedbackDetails from "./components/pages/FeedbackDetails";
import UserPage from "./components/pages/UserPage";
import { UpdateRequest } from "./components/pages/UpdateRequest";

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/feedback/:feedbackID" component={FeedbackDetails} />
      <Route exact path="/user/:userId" component={UserPage} />
      <Route exact path="/edit/:requestId" component={UpdateRequest} />
      <Redirect to="/" />
    </Switch>
  );
};

export default AuthenticatedApp;
