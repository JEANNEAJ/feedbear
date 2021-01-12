import { React } from "react";
import ProjectList from "../projects/ProjectList";
import ProjectForm from "../forms/ProjectForm";
import InfiniteScrollList from '../util/InfiniteScrollList';
import { fetchProjects } from '../../api/projects';

const Dashboard = () => {
  return (
    <div>
      <ProjectForm buttonText="Submit" />

      <div className="container mx-auto mt-10">
        <h2 className="text-xl mb-2 font-bold">Projects</h2>
        <InfiniteScrollList List={ProjectList} fetchApi={fetchProjects}/>
      </div>
    </div>
  );
};

export default Dashboard;
