import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import TimeDifference from "../../components/timeDifference/TimeDifference";

import * as api from "../../api/forms";

export default function FeedbackDetails(props) {
  // console.log(props);
  const { feedbackID } = useParams();
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
            <CommentForm />
          </div>
        </>
      )}
    </div>
  );
}
