import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectList from "../projects/ProjectList";
import { fetchProjects } from "../../api/projects";

import InfiniteScrollList from "../lists/InfiniteScrollList";
import Project from "../projects/Project";

import * as projectApi from "../../api/projects";

const Dashboard = () => {
  const [pinned, setPinned] = useState({});

  useEffect(() => {
    getPinned();
  }, []);

  /** get pinned project from the db (hardcoded for now) */
  const getPinned = async () => {
    try {
      const { data } = await projectApi.fetchProjectByID(
        "_id",
        "5ff63422551e1e10ac0a44a1"
      );
      setPinned(data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-screen-md container mx-auto">
      {/* Pinned project asking for feedback */}
      <div>
        <h2 className="text-xl font-bold">Pinned</h2>
        <ul className="w-full flex flex-col items-center">
          <Project project={pinned} />
        </ul>
      </div>

      <div className="container mx-auto mt-10">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Projects</h2>
          <Link to={"/project"} className="btn-submit rounded-full w-12 hover:no-underline">&#65291; Add Project</Link>
        </div>
        <InfiniteScrollList List={ProjectList} fetchApi={fetchProjects} />
      </div>
    </div>
  );
};

export default Dashboard;
