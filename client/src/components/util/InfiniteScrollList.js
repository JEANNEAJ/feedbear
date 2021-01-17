import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { removeDuplicates } from "../../helpers";

export default function InfiniteScrollList({List, fetchApi}) {
  const ASCENDING = 1;
  const DESCENDING = -1;

  /** False when there are no more items - used to display message to user */
  const [hasMore, setHasMore] = useState(true)
  const [items, setItems] = useState([])
  const [sort, setSort] = useState({ sortBy: 'createdAt', sortDirection: DESCENDING })

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
    <>
      <label htmlFor="sort">Sort: </label>
      <select onChange={handleSort} id="sort">
        <option data-sortby="createdAt" data-sortdirection={DESCENDING}>
          Date (Newest)
        </option>
        <option data-sortby="createdAt" data-sortdirection={ASCENDING}>
          Date (Oldest)
        </option>
      </select>

      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
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
    </>
  );
}
