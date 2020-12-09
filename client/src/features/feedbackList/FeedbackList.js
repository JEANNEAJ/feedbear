import React, { useState, useEffect } from "react";
import FeedbackListItem from "./FeedbackListItem";
import * as api from "../../api/forms";

export default function FeedbackList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    try {
      const { data } = await api.fetchForms();

      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-bold">Feedback Requests</h2>
        <button onClick={handleRefresh}>refresh 🔃</button>
      </div>
      <ul>
        {requests.map((request) => (
          <FeedbackListItem key={request._id} request={request} />
        ))}
      </ul>
    </div>
  );
}
