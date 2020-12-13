import React from 'react';
import CommentListItem from './CommentListItem';

export default function CommentList(props) {
  const { comments } = props;
  
  return (
    <>
      {!comments.length ? <span>No comments found!</span> :
      <ul>
        {comments.map(comment => <CommentListItem comment={comment} key={comment._id} />)}
      </ul>}
    </>
  )
}
