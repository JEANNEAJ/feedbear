import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import "./App.css";

import FeedbackDetails from "./features/feedbackDetails/FeedbackDetails";

import LoginForm from "./features/user/LoginForm";
import { selectUser, checkForUserSession } from "./features/user/userSlice";
import SignupForm from "./features/user/SignupForm";
import UserPage from "./features/user/UserPage";

import Form from './components/form/Form';

import Nav from "./components/nav/Nav";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from './components/Footer/Footer';

import { UpdateRequest } from "./features/feedbackRequest/UpdateRequest";
import { AuthRoute, ProtectedRoute } from './util/route';


function App() {
  const user = useSelector(selectUser);
  const userSessionChecked = useSelector(state => state.user.userSessionChecked);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(checkForUserSession()) }, []);

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
                { 
                  userSessionChecked 
                  ? user._id ? <Dashboard /> : <Form type="LoginForm" />
                  : <p>Loading</p>  
                }
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
