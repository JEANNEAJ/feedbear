import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

export default function List(props) {
  const { listItems } = props;

  return (
    <ul>
      <InfiniteScroll
        dataLength={listItems.length} //This is important field to render the next data
        next={() => dispatch(fetchNext())}
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
        {projects.map((project) => (
          <Project key={project._id} project={project} />
        ))}
      </InfiniteScroll>
    </ul>
  )
}
