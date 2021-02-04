import React, { useEffect, useState } from "react";
import ProjectForm from "../forms/ProjectForm";
import { useRouteMatch, Redirect } from "react-router-dom";
import * as projectApi from "../../api/projects";
import { selectUser } from "../../slices/userSlice";
import { useSelector } from "react-redux";
import LoadingSpinner from '../util/LoadingSpinner';

export const UpdateProject = () => {
  const {
    params: { projectId },
  } = useRouteMatch();

  // set state variable to track progress of verifying if the logged in user is authorized to edit the requested project
  const [authorizationCheck, setAuthorizationCheck] = useState({
    complete: false,
    isUserAuthorizedToEdit: false,
  });
  const [project, setProject] = useState("");

  // get current logged in user from redux state
  const currentLoggedInUser = useSelector(selectUser);

  useEffect(() => {
    getSavedRequest();
  }, []);

  const getSavedRequest = async () => {
    try {
      const { data } = await projectApi.fetchProjectByID("_id", projectId);

      const project = data[0];
      // check if the retrieved project userId (id of the creator) is the same as the current logged in user's id
      if (project?.userId._id === currentLoggedInUser._id) {
        // set project in state to fetched project
        setProject(project);
        // update authorization check to true, and that the logged in user created the project
        setAuthorizationCheck({ complete: true, isUserAuthorizedToEdit: true });
      } else {
        // if the project's creator id does not match the current loggedin user's id
        // set authorization check to complete, and that the current logged in user is not authorized to edit the project
        setAuthorizationCheck({
          complete: true,
          isUserAuthorizedToEdit: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-screen-md container mx-auto">
      {
        // check if the authorization check has completed
        authorizationCheck.complete
          // when complete check if the logged in user is authorized to edit the project
        ? authorizationCheck.isUserAuthorizedToEdit
          // if they are then render the edit form
          ? <ProjectForm buttonText="Save" values={project} projectId={projectId} headingText="Edit Project" />
          // if the logged in user is not authorized to edit the project
          // redirect to the home page
          : <Redirect to="/" />
          // if the authorization check has not completed then render a loading message
        : <LoadingSpinner />
      }
    </div>
  )
};

export default UpdateProject;
