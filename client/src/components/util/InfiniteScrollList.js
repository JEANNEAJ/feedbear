import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { removeDuplicates } from "../../helpers";

export default function InfiniteScrollList({List, fetchApi}) {
  /** False when there are no more items - used to display message to user */
  const [hasMore, setHasMore] = useState(true)
  const [items, setItems] = useState([])
  const [sort, setSort] = useState({ sortyBy: 'createdAt', sortDirection: -1 })

  useEffect(() => {
    fetchNext()

  }, [sort]);

      
  const handleSort = (e) => {
    const {sortBy, sortDirection} = e.target.options[e.target.selectedIndex].dataset;
  
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

  const fetchNext = async () => {
    const { sortBy, sortDirection } = sort;

    const numResults = 20;
    /** The ID of the last item, empty string if none */
    const last = !items.length ? "" : items[items.length - 1]._id;

    try {
      const { data } = await fetchApi(
        numResults,
        sortBy,
        sortDirection,
        last
      );
      const fetchedItems = removeDuplicates(items, data, numResults);

      if (fetchedItems.length === items.length) {
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
        <option data-sortby="createdAt" data-sortdirection="-1">
          Date (descending)
        </option>
        <option data-sortby="createdAt" data-sortdirection="1">
          Date (ascending)
        </option>
      </select>

      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
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
        <List items={items} />
      </InfiniteScroll>
    </>
  );
}
