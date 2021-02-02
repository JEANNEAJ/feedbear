import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SignupForm from "./components/forms/SignupForm";
import ContactPage from "./components/pages/ContactPage";
import Hero from "./components/layout/Hero";

const UnauthenticatedApp = () => {
  return (
    <Switch>
      <Route exact path="/" component={Hero} />
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path={'/contact'} component={ContactPage} />
      <Redirect to="/" />
    </Switch>
  );
};

export default UnauthenticatedApp;
