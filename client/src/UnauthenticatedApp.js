import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SignupForm from "./components/forms/SignupForm";
import Hero from "./components/layout/Hero";

const UnauthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path="/" component={Hero} />
      <Route exact path="/signup" component={SignupForm} />
      <Redirect to="/" />
    </Switch>
  );
};

export default UnauthenticatedApp;
