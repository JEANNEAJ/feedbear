import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { removeDuplicates } from "../../helpers";

import LoadingSpinner from "../util/LoadingSpinner";

/** List component with infinite scroll */
export default function List(props) {
  const { List, fetchApi } = props;

  const ASCENDING = 1;
  const DESCENDING = -1;

  /** False when there are no more projects - used to display message to user */
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState({
    sortBy: "createdAt",
    sortDirection: DESCENDING,
  });

  useEffect(() => {
    setHasMore(true);
    fetchNext([]);
    // reset and fetch when the sort value or the fetchApi prop value changes
  }, [sort, fetchApi]);

  const handleSort = (e) => {
    const sortBy = e.target.options[e.target.selectedIndex].dataset.sortby;
    const sortDirection =
      e.target.options[e.target.selectedIndex].dataset.sortdirection;

    setSort({
      sortBy,
      sortDirection,
    });
  };

  const fetchNext = async (previousItems = items) => {
    const numResults = 20;
    /** The ID of the last item, empty string if none */
    const last = !previousItems.length
      ? ""
      : previousItems[previousItems.length - 1]._id;

    try {
      // set options for the api call
      const options = {
        ...sort,
        numResults,
        last,
      };

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
  };

  return (
    <>
      <div className="bg-white hover:bg-gray-300 rounded-lg w-max p-2 text-xs">
        <label htmlFor="sort" className="font-bold">
          Sort:{" "}
        </label>
        <select
          onChange={handleSort}
          id="sort"
          className="p-1 pr-5 rounded-md border-0 text-xs"
        >
          <option data-sortby="createdAt" data-sortdirection={DESCENDING}>
            Date (Newest)
          </option>
          <option data-sortby="createdAt" data-sortdirection={ASCENDING}>
            Date (Oldest)
          </option>
        </select>
      </div>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchNext}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        scrollThreshold={1} // how far down to scroll before fetching more
        endMessage={
          <p className="text-center pt-3">
            <b>Yay! You've seen it all!</b>
          </p>
        }
      >
        <List items={items} />
      </InfiniteScroll>
    </>
  );
}
