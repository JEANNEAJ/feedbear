import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComments, selectComments } from './commentSlice';

import Form from '../../components/form/Form';
import TimeDifference from '../../components/timeDifference/TimeDifference';
import CommentList from'./CommentList';

import * as formApi from "../../api/forms";
import * as commentApi from "../../api/comments";

export default function FeedbackDetails(props) {
  const { feedbackID } = props.match.params;

  const [request, setRequest] = useState([]);
  const comments = useSelector(selectComments);

  const dispatch = useDispatch();

  const { name, message, projectTitle, projectLink, liveLink, createdAt } = request;

  const populateRequests = async () => {
    try {
      const { data } = await formApi.fetchFormByID("_id", feedbackID);

      setRequest(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getComments = async () => {
    try {
      const { data } = await commentApi.fetchComments(feedbackID);
      dispatch(setComments(data.length ? data[0].comments : []));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    populateRequests();
    getComments();
  }, [feedbackID]);

  return (
    <div>
      <p>ID: {feedbackID}</p>

      {!request ? (
        "Loading..."
      ) : (
        <>
          <h2>{projectTitle}</h2>
          <p>by {name}</p>
          <p>submitted <TimeDifference dateString={createdAt} /> ago</p>
          <img src="https://placekitten.com/200/300" alt="Placeholder" />
          <a href={liveLink}>View App</a>
          <a href={projectLink}>View Repository</a>
          <p>{message}</p>

          <CommentList comments={comments} feedbackID={feedbackID} />
          <Form type="CommentForm" feedbackID={feedbackID} />

        </>
      )}
    </div>
  );
}
