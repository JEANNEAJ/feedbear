import React, { useEffect, useState } from "react";
import ProjectForm from "../forms/ProjectForm";
import { useRouteMatch } from "react-router-dom";
import * as api from "../../api/projects";

export const UpdateProject = () => {
  const {
    params: { projectId },
  } = useRouteMatch();
  const [project, setProject] = useState("");

  useEffect(() => {
    const getSavedRequest = async () => {
      try {
        const { data } = await api.fetchProjectByID("_id", projectId);
        setProject(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getSavedRequest();
  }, []);

  return (
    <div>
      <h3>Edit Your Requests:</h3>
      {project ? (
        <ProjectForm buttonText="Save" values={project} projectId={projectId} />
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default UpdateProject;
