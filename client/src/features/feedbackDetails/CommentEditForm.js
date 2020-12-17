import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setEditing, getComments } from './commentSlice';

import * as commentApi from '../../api/comments';

export default function CommentEditForm(props) {
  const { comment, feedbackID, commentId } = props;
  const { register, handleSubmit, watch, errors } = useForm();

  const dispatch = useDispatch();

  const handleSave = async (data) => {
    try {
      // if comment has been edited then update
      if (data.editComment !== comment) { 
        await commentApi.updateComment(feedbackID, commentId, data.editComment);
        dispatch(getComments(feedbackID));
      }

      dispatch(setEditing(null));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    dispatch(setEditing(null));
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
      <button onClick={handleCancel} type="button">cancel</button>
    </form>
  )
}