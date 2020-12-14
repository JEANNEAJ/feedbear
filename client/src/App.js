import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, checkForUserSession } from "./features/user/userSlice";

import Nav from "./components/nav/Nav";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  const user = useSelector(selectUser);
  const userSessionChecked = useSelector(
    (state) => state.user.userSessionChecked
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkForUserSession());
  }, [dispatch]);

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
            {userSessionChecked ? (
              user._id ? (
                <AuthenticatedApp />
              ) : (
                <UnauthenticatedApp />
              )
            ) : (
              <p>Loading</p>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
