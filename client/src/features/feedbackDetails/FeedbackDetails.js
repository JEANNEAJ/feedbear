import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, setComments, selectComments } from './commentSlice';

import CommentList from'./CommentList';
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import TimeDifference from "../../components/timeDifference/TimeDifference";

import * as formApi from "../../api/forms";
// import * as commentApi from "../../api/comments";

export default function FeedbackDetails(props) {

  const [request, setRequest] = useState([]);
  const comments = useSelector(selectComments);
  const { feedbackID } = useParams();

  const dispatch = useDispatch();

  const {
    name,
    message,
    projectTitle,
    projectLink,
    liveLink,
    createdAt,
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

  return (
    <div className="container mx-auto">
      {!request ? (
        "Loading..."
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-bold">{projectTitle}</h2>
            <p>by {name}</p>
            <p>
              submitted <TimeDifference dateString={createdAt} /> ago
            </p>
            <div className="flex space-x-4">
              <a href={liveLink}>View App</a>
              <a href={projectLink}>View Repository</a>
            </div>
            <img
              className="mx-auto max-w-full my-3"
              src="https://placekitten.com/400/300"
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
