<<<<<<< HEAD
import React from "react";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import "./App.css";

import FeedbackDetails from "./features/feedbackDetails/FeedbackDetails";

import UserPage from "./features/user/UserPage";

import Form from './components/form/Form';
=======
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, checkForUserSession } from "./features/user/userSlice";
>>>>>>> master

import Nav from "./components/nav/Nav";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import Footer from "./components/Footer/Footer";

  import "./tailwind.output.css";
  
  function App() {
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const userSessionChecked = useSelector(
    (state) => state.user.userSessionChecked
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkForUserSession());
  }, [dispatch]);


  return (
    <Router>
      {/* arrange components in a flex-column that spans 100vh */}
      <div className="bg-gradient-to-b from-purple-400 to-blue-400 flex flex-col justify-between min-h-screen">
        <header>
          <Nav />
        </header>


        {/* main component fills space b/w header and footer, centered vertically */}
        <main className="flex-grow flex flex-col justify-around p-5">
          {userSessionChecked ? (
            user._id ? (
              <AuthenticatedApp />
            ) : (
              <UnauthenticatedApp />
            )
          ) : (
            <p>Loading</p>
          )}

        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
