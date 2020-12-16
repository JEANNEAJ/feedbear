import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from "react-redux";
import { getComments, setEditing, selectEditing } from './commentSlice';

import TimeDifference from '../../components/timeDifference/TimeDifference';
import Form from '../../components/form/Form';

import * as userApi from '../../api/user.js';
import * as commentApi from '../../api/comments.js';
import { selectUser } from '../user/userSlice';

export default function CommentListItem (props) {
  const { _id, comment, createdAt, userId } = props.comment;
  const { feedbackID } = props;

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
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  /** Returns true if this comment was made by the currently logged in user */
  const isUserComment = () => {
    if (currentUser._id === userId) return true;
    else return false;
  };

  const handleDelete = async () => {
    try {
      await commentApi.deleteComment(feedbackID, _id);
      dispatch(getComments(feedbackID));
    } catch (err) {
      console.error(err);
    }
  }

  const handleEdit = () => {
    dispatch(setEditing(_id))
  }

  return (
    <li className='p-3 rounded-md border flex max-w-2xl mx-auto'> 
      {!user ? (
          "Loading..."
        ) : (
          <>
          {/* <img className='w-12 h-12 rounded-full flex-none' src={user.avatarUrl} alt={user.name} /> */}
          <div className='pl-3'>
            <h4 className='font-bold'><a href='#'>{user.name}{isUserComment() && ' (You)'}</a></h4>
            <p>submitted <TimeDifference dateString={createdAt} /> ago</p>

            {editing !== _id ? <p>{comment}</p> : (
              <Form
                type="CommentEditForm"
                comment={comment}
                feedbackID={feedbackID}
                commentId={_id}
              />
            )}

            {isUserComment() && 
              <>
                <button onClick={handleDelete}>delete</button>
                <button onClick={handleEdit}>edit</button>
              </>
             }
          </div>
          </>
        )
      }
    </li>
  )
}