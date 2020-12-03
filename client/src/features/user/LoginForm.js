import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./userSlice";

import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (handler, e) => {
    handler(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = { email, password };
    dispatch(login(credentials));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  return (
    <form>
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
      <button onClick={handleLogin}>Sign In</button>
      <button onClick={handleSignup}>Sign Up</button>
    </form>
  );
};

export default LoginForm;
