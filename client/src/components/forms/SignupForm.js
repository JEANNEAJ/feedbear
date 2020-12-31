import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, signup, selectError } from "../../slices/userSlice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // cleanup error state in Redux store on unmount
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleSignup = (data) => {
    const { email, password, name } = data;
    const credentials = { email, password, name };
    dispatch(signup(credentials));
  };

  return (
    <form
      className="form flex flex-col items-center"
      onSubmit={handleSubmit(handleSignup)}
    >
      <input
        className="input-text"
        name="name"
        type="text"
        placeholder="Name"
        ref={register({ required: true })}
      />
      {errors.name && <span>This field is required</span>}

      <input
        className="input-text"
        name="email"
        type="email"
        placeholder="E-mail"
        ref={register({ required: true })}
      />
      {errors.email && <span>This field is required</span>}

      <input
        className="input-text"
        name="password"
        type="password"
        placeholder="Password"
        ref={register({ minLength: 8 })}
      />
      {errors.password && <span>Password must be at least 8 characters</span>}

      {error ? (
        <p className="error">
          <strong>Error: </strong>
          {error}
        </p>
      ) : (
        ""
      )}

      <button className="btn-submit">Create User</button>
      <p>Already registered?</p>
      <p>
        <Link to="/">Click here</Link> to log in.
      </p>
    </form>
  );
};

export default SignupForm;
