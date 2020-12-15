import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

import * as api from "../../api/forms";

import FeedbackListItem from "../feedbackList/FeedbackListItem";

export default function UserPage() {
  const user = useSelector((state) => state.user);
  const { name, _id } = user.data;
  // console.log(_id);

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    try {
      const { data } = await api.fetchFormByID("userId", _id);
      console.log(data);
      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (requestId) => {
    try {
      await api.deleteFeedbackRequest(requestId);
      handleRefresh();
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
      <p className="text-xl font-bold">Welcome, {name}!</p>

      <h3 className="text-xl mt-3">Your Feedback Requests:</h3>

      {!requests.length ? (
        <p>
          Nothing here, try making a <Link to={"/"}>new Feedback Request</Link>
        </p>
      ) : (
        <ul>
          {requests.map((request) => (
            <FeedbackListItem key={request._id} request={request}>
              <div className="flex space-x-2">
                <Link to={`/edit/${request._id}`}>Edit</Link>{" "}
                <button onClick={() => openModal(request.projectTitle, request._id)}>
                  Delete
                </button>
              </div>
            </FeedbackListItem>
          ))}
        </ul>
      )}

      <button onClick={handleRefresh}>refresh 🔃</button>

    </div>
  );
}
