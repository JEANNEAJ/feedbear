import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import FeedbackDetails from "./features/feedbackDetails/FeedbackDetails";
import { selectUser, checkLoggedIn } from "./features/user/userSlice";
import UserPage from "./features/user/UserPage";
import { UpdateRequest } from "./features/feedbackRequest/UpdateRequest";

import Form from "./components/form/Form";
import Nav from "./components/nav/Nav";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";

import "./tailwind.output.css";

function App() {
  const user = useSelector(selectUser);
  const loginChecked = useSelector((state) => state.user.loginChecked);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoggedIn());
  }, [loginChecked]);

  return (
    <Router>
      {/* arrange components in a flex-column that spans 100vh */}
      <div className="bg-gradient-to-b from-purple-400 to-blue-400 flex flex-col justify-between min-h-screen">
        <header>
          <div className="wrapper">
            <Nav />
          </div>
        </header>

        {/* main component fills space b/w header and footer, centered vertically */}
        <main className="flex-grow flex flex-col justify-around p-5">
          <div className="">
            <Route exact path="/">
              {loginChecked ? (
                user._id ? (
                  <Dashboard />
                ) : (
                  <Form type="LoginForm" />
                )
              ) : (
                <p>Loading</p>
              )}
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
            <Route exact path="/edit/:requestId" component={UpdateRequest} />
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
