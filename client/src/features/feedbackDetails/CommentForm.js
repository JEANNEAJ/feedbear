import React from "react";

import { useForm } from "react-hook-form";

export default function CommentForm() {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      className="form flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="sr-only" htmlFor="input-feedback">
        Your feedback
      </label>
      <textarea
        className="input-text"
        name="input-feedback"
        id="input-feedback"
        placeholder="Leave your feedback"
        ref={register({ required: true })}
      ></textarea>
      {errors["input-feedback"] && <span>This field is required</span>}

      <button className="btn-submit" type="submit">
        Submit
      </button>
    </form>
  );
}
