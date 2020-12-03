import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "./userSlice";
import { Link } from "react-router-dom";

import "./forms.css";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (handler, e) => {
    handler(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = { email, password, name };
    dispatch(signup(credentials));
  };

  return (
    <form className="form">
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

      <button onClick={handleLogin}>Create User</button>
      <p>
        Already registered? <Link to="/">Click here</Link> to log in.
      </p>
    </form>
  );
};

export default SignupForm;
