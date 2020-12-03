import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";

import Form from "./features/form/Form";
import FeedbackRequests from "./features/feedbackRequests/FeedbackRequests";
import FeedbackDetails from "./features/feedbackDetails/FeedbackDetails";
import SignIn from "./features/signIn/SignIn";
import { selectUser } from "./features/signIn/userSlice";

import Nav from "./features/nav/Nav";
import UserPage from "./features/userPage/UserPage";

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
              {user._id ? <Form /> : <SignIn />}
            </Route>
            <Route exact path="/" component={FeedbackRequests} />
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
