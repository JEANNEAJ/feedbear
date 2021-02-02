import React from "react";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import * as projectApi from "../../api/projects";

export default function ProjectOptions(props) {
  const { userId, projectId, projectTitle, deleteAction } = props;
  const history = useHistory();

  const handleDelete = async (projectId) => {
    try {
      await projectApi.deleteProject(projectId);

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
        '<p>Are you sure you want to delete this project?</p><p style={{ marginBottom: "1.2em" }}> This operation is irreversible</p>',
      confirmButtonText: "Delete",
      confirmButtonColor: "#dd6b55",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) handleDelete(projectId);
    });
  };

  return (
    <div className="flex space-x-2">
      {/* AT: Added classNames to these 2 elements below: */}
      <Link to={`/edit/${projectId}`}> <button className='btn-edit'>Edit</button> </Link>{" "}
      <button onClick={openModal} className='btn-delete' >Delete</button>
    </div>
  );
}
