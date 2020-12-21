import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { getComments, setComments, selectComments } from './commentSlice';
import Swal from 'sweetalert2';

import CommentList from'./CommentList';
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import TimeDifference from "../../components/timeDifference/TimeDifference";

import * as formApi from "../../api/forms";
// import * as commentApi from "../../api/comments";

export default function FeedbackDetails(props) {
  const loggedInUserId = useSelector(state => state.user.data._id);
  const [request, setRequest] = useState([]);
  const comments = useSelector(selectComments);
  const { feedbackID } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    userId,
    name,
    message,
    projectTitle,
    projectLink,
    liveLink,
    createdAt,
    file,
  } = request;

  const populateRequest = async () => {
    try {
      const { data } = await formApi.fetchFormByID("_id", feedbackID);

      setRequest(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    populateRequest();
    dispatch(getComments(feedbackID));
  }, [feedbackID]);

  const handleDelete = async (requestId) => {
    try {
      await formApi.deleteFeedbackRequest(requestId);
      
      history.push(`/user/${loggedInUserId}`);
      
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (projectTitle, id) => {
    Swal.fire({
      title: `Delete ${projectTitle}?`,
      html: '<p>Are you sure you want to delete this request?</p><p style={{ marginBottom: "1.2em" }}> This operation is irreversible</p>',
      confirmButtonText: 'Delete',
      confirmButtonColor: '#dd6b55',
      showCancelButton: true,
    }).then(res => {
      if (res.isConfirmed) handleDelete(id)
    })
  }

  return (
    <div className="container mx-auto">
      {!request ? (
        "Loading..."
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="text-lg flex justify-between">
              <h2 className="text-xl font-bold">{projectTitle}</h2>
              {
                loggedInUserId === userId
                &&
                <div className="flex space-x-2">
                  <Link to={`/edit/${feedbackID}`}>Edit</Link>{" "}
                  <button onClick={() => openModal(projectTitle, feedbackID)}>
                    Delete
                  </button>
                </div>
              }
            </div>
            <p>by <Link to={`/user/${userId}`}>{name}</Link></p>
            <p>
              submitted <TimeDifference dateString={createdAt} /> ago
            </p>
            <div className="flex space-x-4">
              <a href={liveLink}>View App</a>
              <a href={projectLink}>View Repository</a>
            </div>
            <img
              className="mx-auto max-w-full my-3"
              src={file ? file : "https://placekitten.com/400/300"}
              alt="Placeholder"
            />
            <p className="mb-10">{message}</p>
            <p className="text-sm">ID: {feedbackID}</p>
          </div>
          <div className="mt-10">
            <h3 className="mb-5 text-xl font-bold">Feedback</h3>
            <CommentList comments={comments} feedbackID={feedbackID} />
            <CommentForm feedbackID={feedbackID} />
          </div>
        </>
      )}
    </div>
  );
}
