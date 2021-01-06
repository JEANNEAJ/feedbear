import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import ListItem from './ListItem';

import {
  setProjects,
  selectProjects,
  setSort,
  fetchNext,
  setHasMore,
  selectHasMore,
} from "../../slices/projectListSlice";

/** List component with infinite scroll */
export default function List(props) {
  const { listItems } = props;

  /** False when there are no more projects - used to display message to user */
  const hasMore = useSelector(selectHasMore);
  const listItems = useSelector(selectProjects);

  useEffect(() => {
    resetRequests();
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

    resetRequests();
  };

  const resetRequests = () => {
    dispatch(setProjects([]));
    dispatch(setHasMore(true));
    dispatch(fetchNext());
  };

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
            <ListItem key={listItem._id} listItem={listItem} />
          ))}
        </InfiniteScroll>
      </ul>
    </div>
  )
}
