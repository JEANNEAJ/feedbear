import React from 'react';
import CommentListItem from './CommentListItem';

export default function CommentList(props) {
  const { comments, feedbackID } = props;
  
  return (
    <>
      {!comments.length ? <span>No comments found!</span> :
      <ul className="pb-4">
        {comments.map(comment => <CommentListItem comment={comment} feedbackID={feedbackID} key={comment._id} />)}
      </ul>}
    </>
  )
}
