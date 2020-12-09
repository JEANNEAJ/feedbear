import React, { useState, useEffect } from "react";

import Form from "../../components/form/Form";

import * as api from "../../api/forms";

export default function FeedbackDetails(props) {
  // console.log(props);
  const { feedbackID } = props.match.params;
  // console.log('id', feedbackID);

  const [request, setRequest] = useState([]);
  // console.log(request);
  const {
    name,
    message,
    projectTitle,
    projectLink,
    liveLink,
    createdAt,
  } = request;

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
      {!request ? (
        "Loading..."
      ) : (
        <>
          <h2 className="text-xl font-bold">{projectTitle}</h2>
          <p>by {name}</p>
          <p>created at {createdAt}</p>
          <a href={liveLink}>View App</a>
          <a href={projectLink}>View Repository</a>
          <img
            className="mx-auto max-w-full my-3"
            src="https://placekitten.com/400/300"
            alt="Placeholder"
          />
          <p className="mb-10">{message}</p>

          <h3 className="text-xl font-bold">Feedback</h3>
          <Form type="CommentForm" />
        </>
      )}

      <p className="text-sm">ID: {feedbackID}</p>
    </div>
  );
}
