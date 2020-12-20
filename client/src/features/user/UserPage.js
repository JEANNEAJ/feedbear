import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

import * as formApi from "../../api/forms";
import * as userApi from "../../api/user";

import FeedbackListItem from "../feedbackList/FeedbackListItem";
import { selectUser } from "./userSlice";

function UserPage() {
  const [ isLoading, setIsLoading ] = useState(true);
  const { userId } = useParams();
  const loggedInUser = useSelector(selectUser);
  const [ name, setName ] = useState("")
  const [ requests, setRequests ] = useState([]);

  useEffect( () => {
    setUserName();
    handleRefresh();
    setIsLoading(false);
    
  },[userId])
  
  const setUserName = async () => {
    if (userId === loggedInUser._id) {
      setName(loggedInUser.name);
    } else {
      (async function() {
        try {
          const { name } = await userApi.getUserName(userId).then(response => response.data[0]);
          setName(name);
        } catch (error) {
          console.log(error);
        }
      })()
    }
    
  }

  const handleRefresh = async () => {
    try {
      const { data } = await formApi.fetchFormByID("userId", userId);
      console.log(data);
      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (requestId) => {
    try {
      await formApi.deleteFeedbackRequest(requestId);
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
      {
        isLoading
        ? 
        <h2>Loading user details</h2>
        
        : 
        <>
        <h2 className="text-xl font-bold">Welcome, {name}!</h2>

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
          
        </>
      }
    </div>
  )

}

export default UserPage;