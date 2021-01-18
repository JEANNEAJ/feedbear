import { React } from "react";
import ProjectList from "../projects/ProjectList";
import ProjectForm from "../forms/ProjectForm";
import { fetchProjects } from '../../api/projects';

import InfiniteScrollList from '../lists/InfiniteScrollList';

const Dashboard = () => {
  return (
    <div>
      <ProjectForm buttonText="Submit" />
      <InfiniteScrollList List={ProjectList} fetchApi={fetchProjects} />
    </div>
  );
};

export default Dashboard;
