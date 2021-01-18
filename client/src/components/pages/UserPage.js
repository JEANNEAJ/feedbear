import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import * as userApi from "../../api/user";
import * as projectApi from "../../api/projects";

import { selectUser } from "../../slices/userSlice";
import ProjectList from "../projects/ProjectList";
import InfiniteScrollList from '../lists/InfiniteScrollList';

function UserPage() {
  const { userId: profileId } = useParams();
  const loggedInUser = useSelector(selectUser);
  const [name, setName] = useState("");

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

  /**
   * function preset with the api options specific to the user page
   * @param  {...any} extraOptions extra option paramters to be used in the api call
   */
  const fetchUserProjects = (...extraOptions) => {
    const options = {
      idType: 'userId',
      id: profileId,
      ...extraOptions[0]
    }

    return projectApi.fetchProjects(options)
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold">{name}</h2>
      <h3 className="text-xl mt-3">Projects:</h3>
      <InfiniteScrollList List={ProjectList} fetchApi={fetchUserProjects}/>
    </div>
  );
}

export default UserPage;
