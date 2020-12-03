import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";

import FeedbackRequestForm from "./features/feedbackRequest/FeedbackRequestForm";
import FeedbackList from "./features/feedbackList/FeedbackList";
import FeedbackDetails from "./features/feedbackDetails/FeedbackDetails";
import LoginForm from "./features/user/LoginForm";
import { selectUser } from "./features/user/userSlice";
import UserPage from "./features/user/UserPage";

import Nav from "./components/nav/Nav";

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
              {user._id ? <FeedbackRequestForm /> : <LoginForm />}
            </Route>
            <Route exact path="/" component={FeedbackList} />
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
