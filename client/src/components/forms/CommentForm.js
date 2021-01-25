import React from "react";
import { useDispatch } from "react-redux";
import { getComments } from "../../slices/commentSlice";

import { useForm } from "react-hook-form";
import FormError from "./FormError";

import * as commentApi from "../../api/comments";

export default function CommentForm(props) {
  const { projectId } = props;
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const comment = data["input-feedback"];

    try {
      const { data } = await commentApi.createComment(projectId, { comment });
      console.log(data);

      reset(); // clear text fields & errors

      dispatch(getComments(projectId)); // update list
    } catch (err) {
      console.error(err);
    }
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
        name="input-feedback"
        id="input-feedback"
        placeholder="Leave your feedback"
        ref={register({ required: true })}
      ></textarea>
      <FormError error={errors["input-feedback"]} errorMsg={"This field is required"} />

      <button className="btn-submit" type="submit">
        Submit
      </button>
    </form>
  );
}
