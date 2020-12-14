import React from 'react'

import { useForm } from "react-hook-form";

export default function CommentForm() {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="sr-only" htmlFor="input-feedback">
        Your feedback
      </label>
      <textarea
        name="input-feedback"
        id="input-feedback"
        placeholder="Leave your feedback"
        ref={register({ required: true })}
      ></textarea>
      {errors['input-feedback'] && <span>This field is required</span>}

      <button type="submit">Submit</button>
    </form>
  )
}
