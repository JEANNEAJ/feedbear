import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import * as formApi from "../../api/forms";
import * as userApi from "../../api/user";

import FeedbackListItem from "../feedbackList/FeedbackListItem";
import FeedbackListItemOptions from "../feedbackList/FeedbackListItemOptions";
import { selectUser } from "./userSlice";

function UserPage() {
  const [ isLoading, setIsLoading ] = useState(true);
  const { userId: profileId } = useParams();
  const loggedInUser = useSelector(selectUser);
  const [ name, setName ] = useState("")
  const [ requests, setRequests ] = useState([]);

  useEffect( () => {
    setUserName();
    handleRefresh();
    setIsLoading(false);
    
  },[profileId])
  
  const setUserName = async () => {
    if (profileId === loggedInUser._id) {
      setName(loggedInUser.name);
    } else {
      (async function() {
        try {
          const { name } = await userApi.getUserName(profileId).then(response => response.data[0]);
          setName(name);
        } catch (error) {
          console.log(error);
        }
      })()
    }
    
  }

  const handleRefresh = async () => {
    try {
      const { data } = await formApi.fetchFormByID("userId", profileId);
      console.log(data);
      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      {
        isLoading
        ? 
        <h2>Loading user details</h2>
        
        : 
        <>
        <h2 className="text-xl font-bold">{name}</h2>

        <h3 className="text-xl mt-3">Feedback Requests:</h3>

        {!requests.length ? (
          <p>
            Nothing here, try making a <Link to={"/"}>new Feedback Request</Link>
          </p>
        ) : (
          <ul>
            {requests.map((request) => (
              <FeedbackListItem key={request._id} request={request}>
                {
                  loggedInUser._id === profileId &&
                  <FeedbackListItemOptions feedbackId={request._id} projectTitle={request.projectTitle} deleteAction={handleRefresh}/>
                }
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