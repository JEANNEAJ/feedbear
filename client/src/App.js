import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import "./App.css";

import FeedbackDetails from "./features/feedbackDetails/FeedbackDetails";
import { selectUser } from "./features/user/userSlice";
import UserPage from "./features/user/UserPage";

import Form from './components/form/Form';

import Nav from "./components/nav/Nav";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from './components/Footer/Footer';

function App() {
  const user = useSelector(selectUser);
  useEffect(() => {}, []);

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
            <Route exact path="/">
              {user._id ? <Dashboard /> : <Form type="LoginForm" />}
            </Route>
            <Route path="/signup">
              {user._id ? <Redirect to="/" /> : <Form type="SignupForm" />}
            </Route>
            <Route
              exact
              path="/feedback/:feedbackID"
              component={FeedbackDetails}
            />
            <Route exact path="/user/:userId" component={UserPage} />
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
