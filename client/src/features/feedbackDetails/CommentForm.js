import React from 'react'

import { useForm } from "react-hook-form";

import * as api from '../../api/comments';

export default function CommentForm(props) {
  const { feedbackID } = props;
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (data) => {
    // console.log('data: ', data);
    const comment = data['input-feedback'];

    try {
      const {data} = await api.createComment(feedbackID, {comment});
      console.log(data);

      
    } catch (err) {
      console.error(err);
    }
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
