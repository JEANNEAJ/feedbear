import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import * as api from '../../api/forms';

import FeedbackListItem from "../feedbackList/FeedbackListItem";

import styles from './UserPage.module.css';

export default function UserPage() {
  const user = useSelector((state) => state.user);
  const { name, _id } = user.data;
  // console.log(_id);

  const [requests, setRequests] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteRequest, setDeleteRequest] = useState({ projectTitle: '', requestId: '' });

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
    setDeleteRequest({});
    setModalIsOpen(false);
  }

  const openModal = (projectTitle, id) => {
    setModalIsOpen(true);
    setDeleteRequest({
      projectTitle,
      id
    });
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
    <div>
      <p>Welcome {name}!</p>

      <h3>Your Feedback Requests:</h3>

      {!requests.length ? (
        <p>
          Nothing here, try making a <Link to={"/"}>new Feedback Request</Link>
        </p>
      ) : (
          <ul className={styles.container}>
            {requests.map((request) => (
              <FeedbackListItem key={request._id} request={request}>
                <p><Link to={`/edit/${request._id}`}>Edit</Link> <button onClick={() => openModal(request.projectTitle, request._id)}>Delete</button></p>
              </FeedbackListItem>
            ))}
          </ul>
        )}
      <button onClick={handleRefresh}>refresh 🔃</button>

      {/* inline styling for demo purposes only */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='delete' style={customStyles} className='Modal'>
        <h2 style={{ marginBottom: '0.8em' }}>Delete {deleteRequest.projectTitle}?</h2>
        <p>Are you sure you want to delete this request?</p>
        <p style={{ marginBottom: '1.2em' }}>This operation is irreversible</p>
        <button onClick={() => handleDelete(deleteRequest.id)}>Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>

    </div>
  );
}
