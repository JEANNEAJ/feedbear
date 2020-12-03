import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SignUp from "./SignUp";
import { login } from "./userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNewUser, setShowNewUser] = useState(false);
  const dispatch = useDispatch();

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
    setShowNewUser(true);
  };

  return (
    <>
      <form>
        <input
          name="email"
          type="text"
          onChange={(e) => handleChange(setEmail, e)}
        />

        <input
          name="password"
          type="password"
          onChange={(e) => handleChange(setPassword, e)}
        />
        <button onClick={handleLogin}>Sign In</button>
        <button onClick={handleSignup}>Sign Up</button>
      </form>
      {showNewUser && <SignUp />}
    </>
  );
};

export default SignIn;
