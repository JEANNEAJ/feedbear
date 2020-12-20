import React, { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import FeedbackListItem from "./FeedbackListItem";
import * as api from "../../api/forms";

export default function FeedbackList() {
  const [requests, setRequests] = useState([]);
  const [items, setItems] = useState(Array.from({ length: 20 }));
  // const [requestsToDisplay, setRequestsToDisplay] = useState([]);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    const numResults = 10;
    const sortBy = 'createdAt';
    const last = !requests.length ? '' : requests[requests.length-1]._id;
    try {
      const { data } = await api.fetchForms(numResults, sortBy, '5fdb8a26828d563f04186d8f');
      setRequests(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNext = () => {
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })))
    }, 1500);
  }

  return (
    <div className="container mx-auto">
      <div className="mt-10 flex justify-between">
        <h2 className="text-xl font-bold">Feedback Requests</h2>
        <button onClick={handleRefresh}>refresh 🔃</button>
      </div>

      <ul>
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchNext}
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
          {items.map((item,index)=><p>item {index}</p>)}
          {/* {!requests.length ? 'Nothing here' : requests.map((request) => (
            <FeedbackListItem key={request._id} request={request} />
          ))} */}
        </InfiniteScroll>
      </ul>

    </div>
  );
}
