import { React } from "react";
import ProjectList from "../projects/ProjectList";
import ProjectForm from "../forms/ProjectForm";

const Dashboard = () => {
  return (
    <div>
      <ProjectForm buttonText="Submit" />
      <ProjectList />
    </div>
  );
};

export default Dashboard;
