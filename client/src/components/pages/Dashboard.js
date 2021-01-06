import { React } from "react";
// import ProjectList from "../projects/ProjectList";
import ProjectForm from "../forms/ProjectForm";

import List from '../lists/List';

const Dashboard = () => {
  return (
    <div>
      <ProjectForm buttonText="Submit" />
      <List type="projects" />
    </div>
  );
};

export default Dashboard;
