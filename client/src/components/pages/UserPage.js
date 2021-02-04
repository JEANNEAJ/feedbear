import React, { useState, useLayoutEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation, Link } from "react-router-dom";

import * as userApi from "../../api/user";
import * as projectApi from "../../api/projects";

import { selectUser } from "../../slices/userSlice";
import ProjectList from "../projects/ProjectList";
import InfiniteScrollList from '../lists/InfiniteScrollList';
import ProjectForm from "../forms/ProjectForm";
import LoadingSpinner from "../util/LoadingSpinner";

function UserPage() {
  const [ isLoading, setIsLoading ] = useState(true)
  const { userId: profileId } = useParams();
  const loggedInUser = useSelector(selectUser);
  const [name, setName] = useState("");
  const [userInfo, setUserInfo] = useState({})

  const isLoggedInUser = loggedInUser._id === profileId;
  

  const location = useLocation();

  const fetchUserInfo = useCallback(async (profileId) => {

    const { data } = await userApi.getUserInfo(profileId);
    
    if (location.name && profileId !== loggedInUser._id) {
      // if name was provided in the Link component, set name from location
      setName(location.name);
    } else if (isLoggedInUser) {
      // if user is on their own profile, set name using Redux
      setName(loggedInUser.name);
    } else {
      // if all else fails, get the name from the API
      setName(data.name);
    }
    setUserInfo(data)
    setIsLoading(false)

  }, [isLoggedInUser, location.name, loggedInUser._id, loggedInUser.name])

  // determine the display name for the current UserPage
  useLayoutEffect(() => {
    setIsLoading(true)
    fetchUserInfo(profileId)
    
  }, [fetchUserInfo, profileId]);

  
  

  /**
   * function preset with the api options specific to the user page
   * @param  {...any} extraOptions extra option parameters to be used in the api call
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
    <div className="max-w-screen-md container mx-auto">

      { 
        isLoading 
        ? <LoadingSpinner />
        :
        <>
          <h2 className="text-3xl font-bold mb-4">
            { name && isLoggedInUser ? `Hi, ${name}!` : `${name}'s Profile`}
          </h2>

          { userInfo.projectCount > 0 
            ?
            <>
              <div className="flex justify-between items-center">
                <h3 className="text-xl">Projects:</h3>
                { userInfo.projectCount > 0 && isLoggedInUser && 
                  <Link to={"/project/new"} className="btn-submit rounded-full w-12 hover:no-underline">&#65291; Add Project</Link> 
                }
              </div> 
              <InfiniteScrollList List={ProjectList} fetchApi={fetchUserProjects} />
            </>
            : <ProjectForm headingText="Add A Project" />
          }
        </>
      }
    </div>
  );
}

export default UserPage;
