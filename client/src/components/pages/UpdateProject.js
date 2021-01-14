import React, { useEffect, useState } from "react";
import ProjectForm from "../forms/ProjectForm";
import { useRouteMatch, Redirect } from "react-router-dom";
import * as projectApi from "../../api/projects";
import { selectUser } from "../../slices/userSlice";
import { useSelector } from "react-redux";

export const UpdateProject = () => {
  const {
    params: { projectId },
  } = useRouteMatch();
  
  // set state variable to track progress of verifying if the logged in user is authorized to edit the request project
  const [checkForAuthorizedUser, setCheckForAuthorizedUser] = useState({complete: false, isUserProjectCreator: false})
  const [project, setProject] = useState("");

  // get current logged in user from redux state
  const currentLoggedInUser = useSelector(selectUser)

  useEffect(() => {
    getSavedRequest();
    
  }, []);
  
  const getSavedRequest = async () => {
    try {
      const { data } = await projectApi.fetchProjectByID("_id", projectId);

      const project = data[0];
      // check if the retrieved project userId (id of the creator) is the same as the current loggedin user's id
      if (project?.userId === currentLoggedInUser._id) {
        // set project in state to fetched project
        setProject(project);
        // update authorization check to true, and that the logged in user created the project
        setCheckForAuthorizedUser({complete: true, isUserProjectCreator: true})
      } else {
        // if the project's creator id does not match the current loggedin user's id
        // set authorization check to complete, and that the current logged in user did not create the retrieved project
        setCheckForAuthorizedUser({complete: true, isUserProjectCreator: false})
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  // render only the Loading message if the check for the authorized user has not completed
  if (checkForAuthorizedUser.complete === false) {
    return <h2>Loading...</h2>
  }
  
  // redirect to home page if the current logged in user did not create the project that is being requested to edit
  if (checkForAuthorizedUser.complete === true && checkForAuthorizedUser.isUserProjectCreator === false) {
    return <Redirect to="/" />
  }

  // otherwise (the check for the authorized user has completed, and the currently logged in user is the creator of the project)
  // render the project editing form
  return (
    <div>
      <h3>Edit Your Requests:</h3>
      <ProjectForm buttonText="Save" values={project} projectId={projectId} />
    </div>
  );
};

export default UpdateProject;
