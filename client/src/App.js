import React from "react";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import "./App.css";

import FeedbackDetails from "./features/feedbackDetails/FeedbackDetails";

import UserPage from "./features/user/UserPage";

import Form from './components/form/Form';

import Nav from "./components/nav/Nav";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from './components/Footer/Footer';

import { UpdateRequest } from "./features/feedbackRequest/UpdateRequest";
import { AuthRoute, ProtectedRoute } from './util/route';

function App() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  return (
    <Router>
      <div className="App">
        <header>
          <div className="wrapper">
            <Nav />
          </div>
        </header>

        <main>
          <div className="wrapper">
            <Switch>
              <Route exact path="/">
                { isLoggedIn ? <Dashboard /> : <Form type="LoginForm" /> }
              </Route>
              
              <AuthRoute path="/signup" component={Form} type="SignupForm" />
            
              <ProtectedRoute exact path="/feedback/:feedbackID" component={FeedbackDetails} />
              <ProtectedRoute exact path="/user/:userId" component={UserPage} />
              <ProtectedRoute exact path="/edit/:requestId" component={UpdateRequest} />
              <Redirect to="/" />
            </Switch>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
