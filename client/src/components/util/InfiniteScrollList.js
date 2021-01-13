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
    fetchNext(sort);

  }, [sort]);
  
  useEffect(() => {
    fetchNext(sort, []);

  }, [fetchApi])

  const handleSort = (e) => {
    const sortBy = e.target.options[e.target.selectedIndex].dataset.sortby;
    const sortDirection = e.target.options[e.target.selectedIndex].dataset.sortdirection;
  
    setSort({ 
      sortBy,
      sortDirection,
    })
    
    resetRequests()
  };

  const resetRequests = () => {
    setItems([])
    setHasMore(true)
  };

  const fetchNext = async (sort, previousItems = items) => {
    const { sortBy, sortDirection } = sort;

    const numResults = 20;
    /** The ID of the last item, empty string if none */
    const last = !items.length ? "" : items[items.length - 1]._id;

    try {
      const options = {
        numResults,
        sortBy,
        sortDirection,
        last
      }

      const { data } = await fetchApi(options);

      // const fetchedItems = removeDuplicates(items, data, numResults);
      const fetchedItems = removeDuplicates(previousItems, data, numResults);

      // if (fetchedItems.length === items.length) {
      if (fetchedItems.length === previousItems.length) {
        setHasMore(false);
      } else {
        setItems(fetchedItems);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <label htmlFor="sort">Sort: </label>
      <select onChange={handleSort} id="sort">
        <option data-sortby="createdAt" data-sortdirection={DESCENDING}>
          Date (descending)
        </option>
        <option data-sortby="createdAt" data-sortdirection={ASCENDING}>
          Date (ascending)
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
        <List items={items} />
      </InfiniteScroll>
    </>
  );
}
