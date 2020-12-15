import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, login, selectError } from "./userSlice";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // cleanup error state in Redux store on unmount
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleLogin = (data) => {
    const { email, password } = data;
    const credentials = { email, password };
    dispatch(login(credentials));
  };

  return (
    <form
      className="md:container mx:auto flex flex-col items-center"
      onSubmit={handleSubmit(handleLogin)}
    >
      <input
        className="input-text"
        name="email"
        type="email"
        placeholder="email"
        ref={register({ required: true })}
      />
      {errors.email && <span>This field is required</span>}

      <input
        className="input-text"
        name="password"
        type="password"
        placeholder="password"
        ref={register({ required: true })}
      />
      {errors.password && <span>This field is required</span>}

      {/* TODO: refactor this into an error message component? FormError or something? */}
      {error ? (
        <p className="error">
          <strong>Error: </strong>
          {error}
        </p>
      ) : (
        ""
      )}

      <button className="btn-submit">Sign In</button>
      <p> Don't have an account?</p>
      <p>
        <Link to="/signup">Click here</Link> to sign up.
      </p>
    </form>
  );
};

export default LoginForm;
