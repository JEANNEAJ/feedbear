import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import ListItem from './ListItem';
import Project from '../projects/Project';
import ProjectOptions from "../projects/ProjectOptions";

import {
  setListItems,
  selectListItems,
  setSort,
  setListType,
  fetchNext,
  setHasMore,
  selectHasMore,
  selectListType,
  setSearchParams,
  selectSearchParams,
  resetList,
} from "../../slices/listSlice";

import { selectUser } from "../../slices/userSlice";

/** List component with infinite scroll */
export default function List(props) {
  const { type } = props;

  /** False when there are no more projects - used to display message to user */
  const hasMore = useSelector(selectHasMore);
  const listItems = useSelector(selectListItems);
  const loggedInUser = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setListType(type));
    dispatch(resetList()).then(() => {
      dispatch(fetchNext());
    });

    // cleanup
    return function cleanup() {
      dispatch(setListItems([]));
    }
  }, []);

  const handleSort = (e) => {
    const sortBy = e.target.options[e.target.selectedIndex].dataset.sortby;
    const sortDirection =
      e.target.options[e.target.selectedIndex].dataset.sortdirection;

    dispatch(
      setSort({
        sortBy,
        sortDirection,
      })
    );

    dispatch(resetList()).then(() => {
      dispatch(fetchNext());
    });
  };

  // const resetList = () => {
  //   dispatch(setListItems([]));
  //   dispatch(setHasMore(true));
  //   dispatch(fetchNext());
  // };

  return (
    <div className="container mx-auto">
      <div className="mt-10 flex justify-between">
        <h2 className="text-xl font-bold">Projects</h2>
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
          dataLength={listItems.length}
          next={() => dispatch(fetchNext())}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollThreshold={1} // how far down to scroll before fetching more
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {listItems.map((listItem) => (
            <ListItem key={listItem._id} listItem={listItem}>
              {/* Conditionally render type of list item depending on type of list */}
              <Project project={listItem}>
                {loggedInUser._id === listItem.userId && (
                  <ProjectOptions
                    userId={loggedInUser._id}
                    projectId={listItem._id}
                    projectTitle={listItem.projectTitle}
                    // deleteAction={handleRefresh}
                  />
                )}
              </Project>
            </ListItem>
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  )
}
