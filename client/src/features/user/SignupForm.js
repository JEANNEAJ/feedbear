import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, signup, selectError } from "./userSlice";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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

  const handleSignup = (e) => {
    e.preventDefault();
    const credentials = { email, password, name };
    dispatch(signup(credentials));
  };

  return (
    <>
      <input
        name="name"
        type="text"
        placeholder="Name"
        onChange={(e) => handleChange(setName, e)}
      />

      <input
        name="email"
        type="text"
        placeholder="E-mail"
        onChange={(e) => handleChange(setEmail, e)}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={(e) => handleChange(setPassword, e)}
      />

      {error ? (
        <p className="error">
          <strong>Error: </strong>
          {error}
        </p>
      ) : (
        ""
      )}

      <button onClick={handleSignup}>Create User</button>
      <p>Already registered?</p>
      <p>
        <Link to="/">Click here</Link> to log in.
      </p>
    </>
  );
};

export default SignupForm;
