import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";

import * as projectApi from "../../api/projects";
import * as userApi from "../../api/user";

import Project from "../projects/Project";
import ProjectOptions from "../projects/ProjectOptions";
import { selectUser } from "../../slices/userSlice";

import List from '../lists/List';

import {
  setListItems,
  selectListItems,
  setSort,
  setListType,
  fetchNext,
  setHasMore,
  selectHasMore,
  selectListType,
  setSearchParams,
  selectSearchParams
} from "../../slices/listSlice";

function UserPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { userId: profileId } = useParams();
  const loggedInUser = useSelector(selectUser);
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);

  const location = useLocation();

  const dispatch = useDispatch();

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

    dispatch(setSearchParams({
      idType: 'userId',
      id: profileId,
    }));

    // cleanup
    return function cleanup() {
      dispatch(setSearchParams({
        idType: '',
        id: '',
      }));
    }
  }, [location.name, loggedInUser, profileId]);

  // // perform initial fetch of projects
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const { data } = await projectApi.fetchProjects(
  //         20,
  //         "createdAt",
  //         -1,
  //         '',
  //         "userId",
  //         profileId
  //         );
  //       setProjects(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchProjects();
  //   setIsLoading(false);
  // }, [profileId]);

  // // handle manual refreshes
  // const handleRefresh = async () => {
  //   setIsLoading(true);
  //   const { data } = await projectApi.fetchProjectByID("userId", profileId);
  //   setProjects(data);
  //   setIsLoading(false);
  // };

  return (
    <div className="container mx-auto">
      {/* {isLoading ? (
        <h2>Loading user details</h2>
      ) : ( */}
        <>
          <h2 className="text-xl font-bold">{name}</h2>

          {/* <h3 className="text-xl mt-3">Projects:</h3> */}

          {/* {!projects.length ? (
            <p>
              Nothing here, try making a <Link to={"/"}>new Project</Link>
            </p>
          ) : (
            <ul>
              {projects.map((project) => (
                <Project key={project._id} project={project}>
                  {loggedInUser._id === profileId && (
                    <ProjectOptions
                      userId={loggedInUser._id}
                      projectId={project._id}
                      projectTitle={project.projectTitle}
                      deleteAction={handleRefresh}
                    />
                  )}
                </Project>
              ))}
            </ul>
          )} */}

          {/* <button onClick={handleRefresh}>refresh 🔃</button> */}

          <List type="userProjects" />
        </>
    </div>
  );
}

export default UserPage;
