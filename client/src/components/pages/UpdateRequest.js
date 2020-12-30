import React, { useEffect, useState } from "react";
import FeedbackRequestForm from "../forms/FeedbackRequestForm";
import { useRouteMatch } from "react-router-dom";
import * as api from "../../api/forms";

export const UpdateRequest = () => {
  const {
    params: { requestId },
  } = useRouteMatch();
  const [request, setRequest] = useState("");

  useEffect(() => {
    const getSavedRequest = async () => {
      try {
        const { data } = await api.fetchFormByID("_id", requestId);
        setRequest(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getSavedRequest();
  }, []);

  return (
    <div>
      <h3>Edit Your Requests:</h3>
      {request ? (
        <FeedbackRequestForm
          buttonText="Save"
          values={request}
          requestId={requestId}
        />
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};
