import React, { useState, useEffect } from "react";

import Form from '../../components/form/Form';

import * as api from "../../api/forms";

export default function FeedbackDetails(props) {
  // console.log(props);
  const { feedbackID } = props.match.params;
  // console.log('id', feedbackID);

  const [request, setRequest] = useState([]);
  console.log(request);
  const { name, email, message, projectLink, liveLink, createdAt } = request;

  useEffect(() => {
    const populateRequests = async () => {
      try {
        const { data } = await api.fetchFormByID("_id", feedbackID);

        setRequest(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    populateRequests();
  }, [feedbackID]);

  return (
    <div>
      <p>ID: {feedbackID}</p>

      {!request ? (
        "Loading..."
      ) : (
        <>
          <h2>Project Name</h2>
          <p>by {name}</p>
          <img src="https://placekitten.com/200/300" alt="Placeholder" />
          <a href={liveLink}>View App</a>
          <a href={projectLink}>View Repository</a>

          <Form type="CommentForm" />
        </>
      )}
    </div>
  );
}
