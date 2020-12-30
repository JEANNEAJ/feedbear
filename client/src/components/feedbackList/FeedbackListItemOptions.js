import React from "react";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import * as projectApi from "../../api/projects";

export default function FeedbackListItemOptions(props) {
  const { userId, feedbackId, projectTitle, deleteAction } = props;
  const history = useHistory();

  const handleDelete = async (requestId) => {
    try {
      await projectApi.deleteProject(requestId);

      if (deleteAction && typeof deleteAction === "function") {
        deleteAction();
      }

      history.push(`/user/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    Swal.fire({
      title: `Delete ${projectTitle}?`,
      html:
        '<p>Are you sure you want to delete this request?</p><p style={{ marginBottom: "1.2em" }}> This operation is irreversible</p>',
      confirmButtonText: "Delete",
      confirmButtonColor: "#dd6b55",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) handleDelete(feedbackId);
    });
  };

  return (
    <div className="flex space-x-2">
      <Link to={`/edit/${feedbackId}`}>Edit</Link>{" "}
      <button onClick={openModal}>Delete</button>
    </div>
  );
}
