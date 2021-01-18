import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { removeDuplicates } from '../../helpers'
// import ListItem from './ListItem';
// import Project from '../projects/Project';
// import ProjectOptions from "../projects/ProjectOptions";

// import {
//   setListItems,
//   selectListItems,
//   setSort,
//   setListType,
//   fetchNext,
//   selectHasMore,
//   resetList,
// } from "../../slices/listSlice";

// import { selectUser } from "../../slices/userSlice";

/** List component with infinite scroll */
export default function List(props) {
  const { List, fetchApi } = props;

  const ASCENDING = 1;
  const DESCENDING = -1;

  /** False when there are no more projects - used to display message to user */
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([])
  const [sort, setSort] = useState({ sortBy: 'createdAt', sortDirection: DESCENDING })


  // const dispatch = useDispatch();

  useEffect(() => {
    setHasMore(true)
    fetchNext([]);
    // reset and fetch when the sort value or the fetchApi prop value changes
  }, [sort, fetchApi]);
    
  const handleSort = (e) => {
    const sortBy = e.target.options[e.target.selectedIndex].dataset.sortby;
    const sortDirection = e.target.options[e.target.selectedIndex].dataset.sortdirection;
    
    setSort({ 
      sortBy,
      sortDirection,
    })
    
  };

  const fetchNext = async (previousItems = items) => {
    const numResults = 20;
    /** The ID of the last item, empty string if none */
    const last = !previousItems.length ? "" : previousItems[previousItems.length - 1]._id;

    try {
      // set options for the api call
      const options = {
        ...sort,
        numResults,
        last
      }

      // fetch `numResults` amount of items from DB
      const { data } = await fetchApi(options);

      // if the amount of items fetched is less than `numResults` then set `hasMore` to false to stop the infinite scroll from requesting more data
      if (data.length < numResults) {
        setHasMore(false);
      }
      
      // remove any duplicate items
      const fetchedItems = removeDuplicates(previousItems, data, numResults);

      // set the items list with the unique fetched items
      setItems(fetchedItems);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="mt-10 flex justify-between">
        <h2 className="text-xl font-bold">Projects</h2>
      </div>

      <label htmlFor="sort">Sort: </label>
      <select onChange={handleSort} id="sort">
        <option data-sortby="createdAt" data-sortdirection={DESCENDING}>
          Date (Newest)
        </option>
        <option data-sortby="createdAt" data-sortdirection={ASCENDING}>
          Date (Oldest)
        </option>
      </select>

      <ul>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollThreshold={1} // how far down to scroll before fetching more
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <List items={items} />
        </InfiniteScroll>
      </ul>
    </div>
  )
}
