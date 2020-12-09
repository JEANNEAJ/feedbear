import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, login, selectError } from "./userSlice";

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
    <>
      <input
        className="input-text"
        name="email"
        type="text"
        placeholder="email"
        onChange={(e) => handleChange(setEmail, e)}
      />

      <input
        className="input-text"
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

      <button
        className="bg-purple-400 rounded-full py-2 px-6 my-3 w-1/4 min-w-max"
        onClick={handleLogin}
      >
        Sign In
      </button>
      <p> Don't have an account?</p>
      <p class="col-start-2 col-span-1">
        <Link to="/signup">Click here</Link> to sign up.
      </p>
    </>
  );
};

export default LoginForm;
