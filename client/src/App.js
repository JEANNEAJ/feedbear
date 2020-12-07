import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import "./App.css";

import FeedbackDetails from "./features/feedbackDetails/FeedbackDetails";
import LoginForm from "./features/user/LoginForm";
import { selectUser } from "./features/user/userSlice";
import SignupForm from "./features/user/SignupForm";
import UserPage from "./features/user/UserPage";

import Nav from "./components/nav/Nav";
import Dashboard from "./components/Dashboard/Dashboard";

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
              {user._id ? <Dashboard /> : <LoginForm />}
            </Route>
            <Route path="/signup">
              {user._id ? <Redirect to="/" /> : <SignupForm />}
            </Route>
            <Route
              exact
              path="/feedback/:feedbackID"
              component={FeedbackDetails}
            />
            <Route exact path="/user/:userId" component={UserPage} />
          </div>
        </main>

        <footer>
          <div className="wrapper"></div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
