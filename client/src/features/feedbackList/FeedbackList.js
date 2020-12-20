import React, { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import FeedbackListItem from "./FeedbackListItem";
import * as api from "../../api/forms";

export default function FeedbackList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    const numResults = 20;
    const sortBy = 'createdAt';
    const last = !requests.length ? '' : requests[requests.length-1]._id;
    try {
      const { data } = await api.fetchForms(numResults, sortBy, last);
      setRequests([...requests, ...data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mt-10 flex justify-between">
        <h2 className="text-xl font-bold">Feedback Requests</h2>
        {/* <button onClick={handleRefresh}>refresh 🔃</button> */}
      </div>

      <ul>
        <InfiniteScroll
          dataLength={requests.length} //This is important field to render the next data
          next={handleRefresh}
          hasMore={true}
          loader={<h4>Loading...</h4>}
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
