import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import FeedbackDetails from "./features/feedbackDetails/FeedbackDetails";
import UserPage from "./features/user/UserPage";
import { UpdateRequest } from "./features/feedbackRequest/UpdateRequest";

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
