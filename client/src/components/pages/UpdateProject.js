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
  
  const [validUser, setValidUser] = useState({check: false, valid: false})
  const [project, setProject] = useState("");

  const currentUser = useSelector(selectUser)

  useEffect(() => {
    getSavedRequest();
    
  }, []);
  
  const getSavedRequest = async () => {
    try {
      const { data } = await projectApi.fetchProjectByID("_id", projectId);

      if (data[0]?.userId === currentUser._id) {
        setProject(data[0]);
        setValidUser({check: true, valid: true})
      } else {
        setValidUser({check: true, valid: false})
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  if (validUser.check === false) {
    return <h2>Loading...</h2>
  }

  if (validUser.check && validUser.valid === false) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h3>Edit Your Requests:</h3>
      <ProjectForm buttonText="Save" values={project} projectId={projectId} />
    </div>
  );
};

export default UpdateProject;
