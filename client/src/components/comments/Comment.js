import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  getComments,
  setEditing,
  selectEditing,
} from "../../slices/commentSlice";

import TimeDifference from "../util/TimeDifference";
import CommentEditForm from "../forms/CommentEditForm";
import MarkdownDisplayComponent from '../util/MarkdownDisplayComponent';

import * as userApi from "../../api/user.js";
import * as commentApi from "../../api/comments.js";
import { selectUser } from "../../slices/userSlice";

export default function Comment(props) {
  const { _id, comment, createdAt, userId } = props.comment;
  const { projectId } = props;

  /** The user info for who created this comment (name, etc.) */
  const [user, setUser] = useState({});
  /** The currently logged in user */
  const currentUser = useSelector(selectUser);
  /** The ID of the comment currently being edited */
  const editing = useSelector(selectEditing);

  const dispatch = useDispatch();

  /** Get user info for this comment */
  const fetchUserData = async () => {
    try {
      const { data } = await userApi.getUserName(userId);
      setUser(data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
    <li className="bg-white rounded-lg shadow-sm mt-3 px-3 py-2 hover:bg-gray-100">
      {!user ? (
        "Loading..."
      ) : (
        <>
          {/* <img className='w-12 h-12 rounded-full flex-none' src={user.avatarUrl} alt={user.name} /> */}
          <div className="pl-3">
            <h4 className="font-bold">
              <Link to={`/user/${userId}`}>
                {user.name}
                {isUserComment() && " (You)"}
              </Link>
            </h4>
            <p className="text-sm">
              submitted <TimeDifference dateString={createdAt} /> ago
            </p>

            {editing !== _id ? (
              <MarkdownDisplayComponent>{comment}</MarkdownDisplayComponent>
            ) : (
              <CommentEditForm
                comment={comment}
                projectId={projectId}
                commentId={_id}
              />
            )}

            {isUserComment() && (
              <>
                <button className="btn-options" onClick={handleDelete}>
                  delete
                </button>
                <button className="btn-options" onClick={handleEdit}>
                  edit
                </button>
              </>
            )}
          </div>
        </>
      )}
    </li>
  );
}
