import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, signup, selectError } from "../../slices/userSlice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { validateEmail, validatePassword } from "../../helpers/validation";

const SignupForm = () => {
  const { register, handleSubmit, watch, errors, getValues } = useForm();
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
      {errors.name && <span>Name cannot be empty</span>}

      <input
        name="email"
        type="email"
        placeholder="E-mail"
        ref={register({
          required: true,
          validate: value => validateEmail(value)
        })}
      />
      {errors.email?.type === 'required' && <span>E-mail cannot be empty</span>}
      {errors.email?.type === 'validate' && <span>Please enter a valid e-mail</span>}

      <input
        name="matchEmail"
        type="email"
        placeholder="Re-enter E-mail"
        ref={register({
          required: true,
          validate: value => value === getValues('email')
        })}
      />
      {errors.matchEmail && <span>E-mail does not match</span>}

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
      {errors.password?.type === 'required' && <span>Password cannot be empty</span>}
      {errors.password?.type === 'minLength' && <span>Password must be at least 8 characters</span>}
      {errors.password?.type === 'validate' && <span>Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number</span>}

      <input
        name="matchPassword"
        type="password"
        placeholder="Re-enter Password"
        ref={register({
          required: true,
          validate: value => value === getValues('password')
        })}
      />
      {errors.matchPassword && <span>Password does not match</span>}

      {error &&
        <p className="error">
          <strong>Error: </strong>
          {error}
        </p>
      }

      <button className="btn-submit">Create User</button>
      <p>Already registered?</p>
      <p>
        <Link to="/">Click here</Link> to log in.
      </p>
    </form>
  );
};

export default SignupForm;
