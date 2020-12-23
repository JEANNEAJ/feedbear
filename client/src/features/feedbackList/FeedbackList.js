import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';

import FeedbackListItem from "./FeedbackListItem";

import { setRequests, selectRequests, setSort, fetchNext, setHasMore, selectHasMore } from './FeedbackListSlice';

export default function FeedbackList() {
  /** False when there are no more requests - used to display message to user */
  const hasMore = useSelector(selectHasMore);
  const requests = useSelector(selectRequests);

  const dispatch = useDispatch();

  useEffect(() => {
    resetRequests();
  }, []);

  const handleSort = (e) => {
    const sortBy = e.target.options[e.target.selectedIndex].dataset.sortby;
    const sortDirection = e.target.options[e.target.selectedIndex].dataset.sortdirection;

    dispatch(setSort({
      sortBy,
      sortDirection,
    }))

    resetRequests();
  }

  const resetRequests = () => {
    dispatch(setRequests([]));
    dispatch(setHasMore(true));
    dispatch(fetchNext());
  };

  return (
    <div className="container mx-auto">
      <div className="mt-10 flex justify-between">
        <h2 className="text-xl font-bold">Feedback Requests</h2>
        {/* <button onClick={handleRefresh}>refresh 🔃</button> */}
      </div>


      <label htmlFor="sort">Sort: </label>
      <select onChange={handleSort} id="sort">
        <option data-sortby="createdAt" data-sortdirection="-1">Date (descending)</option>
        <option data-sortby="createdAt" data-sortdirection="1">Date (ascending)</option>
      </select>

      <ul>
        <InfiniteScroll
          dataLength={requests.length} //This is important field to render the next data
          next={()=>dispatch(fetchNext())}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollThreshold={1} // how far down to scroll before fetching more
          endMessage={
            <p style={{ textAlign: 'center' }}>
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
          {requests.map((request) => (
            <FeedbackListItem key={request._id} request={request} />
          ))}
        </InfiniteScroll>
      </ul>

    </div>
  );
}
