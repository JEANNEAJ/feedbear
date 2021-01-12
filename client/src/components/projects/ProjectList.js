import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import * as projectApi from "../../api/projects";

import Project from "./Project";

import { removeDuplicates } from "../../slices/projectListSlice";

export default function ProjectList() {
  /** False when there are no more projects - used to display message to user */
  const [hasMore, setHasMore] = useState(true)
  const [projects, setProjects] = useState([])
  const [sort, setSort] = useState({ sortyBy: 'createdAt', sortDirection: -1 })


  console.log('projects', projects);

  useEffect(() => {
    console.log('in use effect');
    fetchNext()

  }, [sort]);

      
  const handleSort = (e) => {
    const sortBy = e.target.options[e.target.selectedIndex].dataset.sortby;
    const sortDirection =
    e.target.options[e.target.selectedIndex].dataset.sortdirection;
  
    setSort({ 
      sortBy,
      sortDirection,
    })
    
    resetRequests()
    console.log('sort changed to', sort);
    
  };

  
  const resetRequests = () => {
    setProjects([])
    setHasMore(true)
  };

  const fetchNext = async () => {
    const { sortBy, sortDirection } = sort;
    // const projects = projects;
    const numResults = 20;
    /** The ID of the last project, empty string if none */
    const last = !projects.length ? "" : projects[projects.length - 1]._id;

    try {
      const { data } = await projectApi.fetchProjects(
        numResults,
        sortBy,
        sortDirection,
        last
      );
      const newProjects = removeDuplicates(projects, data, numResults);


      console.log('fetched projects', newProjects)
      console.log('current projects', projects)
      if (newProjects.length === projects.length) {
        console.log('setting has more to false')
        setHasMore(false);
      } else {
        console.log('setting projects to fetched projects')
        setProjects(newProjects);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="mt-10 flex justify-between">
        <h2 className="text-xl font-bold">Projects</h2>
        {/* <button onClick={handleRefresh}>refresh 🔃</button> */}
      </div>

      <label htmlFor="sort">Sort: </label>
      <select onChange={handleSort} id="sort">
        <option data-sortby="createdAt" data-sortdirection="-1">
          Date (descending)
        </option>
        <option data-sortby="createdAt" data-sortdirection="1">
          Date (ascending)
        </option>
      </select>

      <ul>
        <InfiniteScroll
          dataLength={projects.length} //This is important field to render the next data
          // next={() => dispatch(fetchNext())}
          next={fetchNext}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollThreshold={1} // how far down to scroll before fetching more
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          // refreshFunction={this.refresh}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={50}
          // pullDownToRefreshContent={
          //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
          // }
          // releaseToRefreshContent={
          //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          // }
        >
          {projects.map((project) => (
            <Project key={project._id} project={project} />
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
}
