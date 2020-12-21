import React from 'react'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import * as formApi from "../../api/forms";

export default function FeedbackListItemOptions(props) {
  const {feedbackId, projectTitle, deleteAction} = props;

  const handleDelete = async (requestId) => {
    try {
      await formApi.deleteFeedbackRequest(requestId);
      deleteAction()
      
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    Swal.fire({
      title: `Delete ${projectTitle}?`,
      html: '<p>Are you sure you want to delete this request?</p><p style={{ marginBottom: "1.2em" }}> This operation is irreversible</p>',
      confirmButtonText: 'Delete',
      confirmButtonColor: '#dd6b55',
      showCancelButton: true,
    }).then(res => {
      if (res.isConfirmed) handleDelete(feedbackId)
    })
  }

  return (
    <div className="flex space-x-2">
      <Link to={`/edit/${feedbackId}`}>Edit</Link>{" "}
      <button onClick={openModal}>
        Delete
      </button>
    </div>
  )
}
