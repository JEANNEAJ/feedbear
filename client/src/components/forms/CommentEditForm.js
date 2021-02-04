import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import { setEditing, getComments } from "../../slices/commentSlice";

import * as commentApi from "../../api/comments";

export default function CommentEditForm(props) {
  const { comment, projectId, commentId } = props;
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const handleSave = async (data) => {
    try {
      // if comment has been edited then update
      if (data.editComment !== comment) {
        await commentApi.updateComment(projectId, commentId, data.editComment);
        dispatch(getComments(projectId));
      }

      dispatch(setEditing(null));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    dispatch(setEditing(null));
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleSave)}>
      <label className="sr-only" htmlFor="editComment"></label>
      <textarea
        name="editComment"
        id="editComment"
        defaultValue={comment}
        ref={register({ required: true })}
      ></textarea>

      {/* save/cancel buttons */}
      <div className="mt-2 space-x-2 text-center">
        <button className="pill bg-greenBtn" type="submit">
          <FontAwesomeIcon icon={faSave} />
          <span>Save</span>
        </button>
        <button className="pill bg-redBtn" onClick={handleCancel} type="button">
          <FontAwesomeIcon icon={faTimes} />
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );
}
