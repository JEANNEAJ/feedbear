import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  getComments,
  setEditing,
  selectEditing,
} from "../../slices/commentSlice";
import bear from "../../assets/bear.png";

import TimeDifference from "../util/TimeDifference";
import CommentEditForm from "../forms/CommentEditForm";

import * as commentApi from "../../api/comments.js";
import { selectUser } from "../../slices/userSlice";

export default function Comment(props) {
  const { _id, comment, createdAt, userId: userData } = props.comment;
  const { _id: userId, name, avatar } = userData;
  const { projectId } = props;

  /** The currently logged in user */
  const currentUser = useSelector(selectUser);
  /** The ID of the comment currently being edited */
  const editing = useSelector(selectEditing);

  const dispatch = useDispatch();

  /** Returns true if this comment was made by the currently logged in user */
  const isUserComment = () => {
    if (currentUser._id === userId) return true;
    else return false;
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Delete this comment?",
      html: `
        <p>Are you sure you want to delete this comment? This operation is irreversible.</p>
        <p><strong>Comment:</strong></p>
        <p style={{ marginBottom: "1.2em" }}>${comment}</p>
      `,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dd6b55",
      showCancelButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await commentApi.deleteComment(projectId, _id);
          dispatch(getComments(projectId));
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  const handleEdit = () => {
    dispatch(setEditing(_id));
  };

  return (
    <li className="bg-white rounded-lg shadow-sm mt-3 px-3 py-2 hover:bg-gray-300">
      {!userData ? (
        "Loading..."
      ) : (
        <>
          {/* posted by {user} at {time difference} */}
          <div className="flex items-center mb-3">
            <img
              className="object-cover w-5 h-5 mr-1 rounded-full inline-block"
              src={avatar ? avatar : bear}
              alt={`${name}'s avatar`}
            />
            <p className="text-sm">
              <Link to={{ pathname: `/user/${userData?._id}`, name }}>
                {name}
                {isUserComment() && " (You)"}
              </Link>{" "}
              <TimeDifference dateString={createdAt} /> ago
            </p>

            {/* edit/delete button (if applicable) */}
            {isUserComment() && (
              <div className="space-x-2 self-start ml-auto">
                <button className="pill bg-yellowBtn" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faPen} />
                  <span>Edit</span>
                </button>
                <button className="pill bg-redBtn" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>

          {editing !== _id ? (
            <p>{comment}</p>
          ) : (
            <CommentEditForm
              comment={comment}
              projectId={projectId}
              commentId={_id}
            />
          )}
        </>
      )}
    </li>
  );
}
