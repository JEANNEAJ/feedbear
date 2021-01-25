import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, signup, selectError } from "../../slices/userSlice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { validateEmail, validatePassword } from "../../helpers/validation";
import FormError from "./FormError";

const SignupForm = () => {
  const { register, handleSubmit, watch, errors, getValues } = useForm({ mode: 'onBlur' });
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
      noValidate='true'
    >
      <input
        name="name"
        type="text"
        placeholder="Name"
        ref={register({ required: true })}
      />
      <FormError error={errors.name} errorMsg={"Name cannot be empty"} />

      <input
        name="email"
        type="email"
        placeholder="E-mail"
        ref={register({
          required: true,
          validate: value => validateEmail(value)
        })}
      />
      <FormError error={errors.email?.type === 'required'} errorMsg={"E-mail cannot be empty"} />
      <FormError error={errors.email?.type === 'validate'} errorMsg={"Please enter a valid e-mail"} />

      <input
        name="matchEmail"
        type="email"
        placeholder="Re-enter E-mail"
        ref={register({
          required: true,
          validate: value => value === getValues('email')
        })}
      />
      <FormError error={errors.matchEmail} errorMsg={"E-mail does not match"} />

      <input
        name="password"
        type="password"
        placeholder="Password"
        ref={register({
          required: true,
          minLength: 8,
          validate: value => validatePassword(value)
        })}

      />
      <FormError error={errors.password?.type === 'required'} errorMsg={"Password cannot be empty"} />
      <FormError error={errors.password?.type === 'minLength'} errorMsg={"Password must be at least 8 characters"} />
      <FormError error={errors.password?.type === 'validate'} errorMsg={"Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"}/>

      <input
        name="matchPassword"
        type="password"
        placeholder="Re-enter Password"
        ref={register({
          required: true,
          validate: value => value === getValues('password')
        })}
      />
      <FormError error={errors.matchPassword} errorMsg={"Password does not match"} />

      <FormError error={error} errorMsg={error}/>
     
      <button className="btn-submit">Create User</button>
      <p>Already registered?</p>
      <p>
        <Link to="/">Click here</Link> to log in.
      </p>
    </form>
  );
};

export default SignupForm;
