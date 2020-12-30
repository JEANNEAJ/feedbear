import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";

import * as formApi from "../../api/forms";
import * as userApi from "../../api/user";

import FeedbackListItem from "../feedbackList/FeedbackListItem";
import FeedbackListItemOptions from "../feedbackList/FeedbackListItemOptions";
import { selectUser } from "../../slices/userSlice";

function UserPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { userId: profileId } = useParams();
  const loggedInUser = useSelector(selectUser);
  const [name, setName] = useState("");
  const [requests, setRequests] = useState([]);

  const location = useLocation();

  // determine the display name for the current UserPage
  useEffect(() => {
    if (location.name && profileId !== loggedInUser._id) {
      // if name was provided in the Link component, set name from location
      setName(location.name);
    } else if (profileId === loggedInUser._id) {
      // if user is on their own profile, set name using Redux
      setName(loggedInUser.name);
    } else {
      // if all else fails, get the name from the API
      const fetchName = async (profileId) => {
        const { data } = await userApi.getUserName(profileId);
        setName(data[0].name);
      };
      fetchName(profileId);
    }
  }, [location.name, loggedInUser, profileId]);

  // perform initial fetch of FeedbackRequests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await formApi.fetchFormByID("userId", profileId);
        setRequests(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequests();
    setIsLoading(false);
  }, [profileId]);

  // handle manual refreshes
  const handleRefresh = async () => {
    setIsLoading(true);
    const { data } = await formApi.fetchFormByID("userId", profileId);
    setRequests(data);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <h2>Loading user details</h2>
      ) : (
        <>
          <h2 className="text-xl font-bold">{name}</h2>

          <h3 className="text-xl mt-3">Feedback Requests:</h3>

          {!requests.length ? (
            <p>
              Nothing here, try making a{" "}
              <Link to={"/"}>new Feedback Request</Link>
            </p>
          ) : (
            <ul>
              {requests.map((request) => (
                <FeedbackListItem key={request._id} request={request}>
                  {loggedInUser._id === profileId && (
                    <FeedbackListItemOptions
                      userId={loggedInUser._id}
                      feedbackId={request._id}
                      projectTitle={request.projectTitle}
                      deleteAction={handleRefresh}
                    />
                  )}
                </FeedbackListItem>
              ))}
            </ul>
          )}

          <button onClick={handleRefresh}>refresh 🔃</button>
        </>
      )}
    </div>
  );
}

export default UserPage;
