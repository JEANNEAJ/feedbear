import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, login, selectError } from "./userSlice";

import "./forms.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // cleanup error state in Redux store on unmount
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleChange = (handler, e) => {
    handler(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = { email, password };
    dispatch(login(credentials));
  };

  return (
    <form className="form">
      <input
        name="email"
        type="text"
        placeholder="email"
        onChange={(e) => handleChange(setEmail, e)}
      />

      <input
        name="password"
        type="password"
        placeholder="password"
        onChange={(e) => handleChange(setPassword, e)}
      />

      {/* TODO: refactor this into an error message component? FormError or something? */}
      {error ? (
        <p className="error">
          <strong>Error: </strong>
          {error}
        </p>
      ) : (
        ""
      )}

      <button onClick={handleLogin}>Sign In</button>
      <p> Don't have an account?</p>
      <p>
        <Link to="/signup">Click here</Link> to sign up.
      </p>
    </form>
  );
};

export default LoginForm;
