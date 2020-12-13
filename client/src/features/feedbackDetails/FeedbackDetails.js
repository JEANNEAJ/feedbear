import React, { useState, useEffect } from "react";

import Form from '../../components/form/Form';
import TimeDifference from '../../components/timeDifference/TimeDifference';

import * as formApi from "../../api/forms";
import * as commentApi from "../../api/comments";

export default function FeedbackDetails(props) {
  // console.log(props);
  const { feedbackID } = props.match.params;
  // console.log('id', feedbackID);

  const [request, setRequest] = useState([]);
  // console.log(request);
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
      console.log(data);
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

          <Form type="CommentForm" feedbackID={feedbackID} />
        </>
      )}
    </div>
  );
}
