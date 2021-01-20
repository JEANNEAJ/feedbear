import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, login, selectError } from "../../slices/userSlice";
import { useForm } from "react-hook-form";
import FormError from "./FormError";

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
      className="form flex flex-col items-center"
      onSubmit={handleSubmit(handleLogin)}
    >
      <input
        name="email"
        type="email"
        placeholder="email"
        ref={register({ required: true })}
      />
      {errors.email && <span>This field is required</span>}

      <input
        name="password"
        type="password"
        placeholder="password"
        ref={register({ required: true })}
      />
      {errors.password && <span>This field is required</span>}

      <FormError error={error} />

      <button className="btn-submit">Sign In</button>
      <p> Don't have an account?</p>
      <p>
        <Link to="/signup">Click here</Link> to sign up.
      </p>
    </form>
  );
};

export default LoginForm;
