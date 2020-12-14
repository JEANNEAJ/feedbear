import React from 'react';
import { useForm } from "react-hook-form";

import * as commentApi from '../../api/comments';

export default function CommentEditForm(props) {
  const { comment, feedbackID, commentId } = props;
  const { register, handleSubmit, watch, errors } = useForm();

  const handleSave = (data) => {
    commentApi.updateComment(feedbackID, commentId, data.editComment);
  }

  const handleCancel = () => {

  }

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <label className="sr-only" htmlFor="editComment"></label>
      <textarea 
        name="editComment"
        id="editComment"
        defaultValue={comment}
        ref={register({ required: true })}
      ></textarea>
      <button type="submit">save</button>
      <button type="button">cancel</button>
    </form>
  )
}
