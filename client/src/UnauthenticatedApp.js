import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import SignupForm from "./components/forms/SignupForm";

const UnauthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Redirect to="/" />
    </Switch>
  );
};

export default UnauthenticatedApp;
