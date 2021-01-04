import React from "react";
import Comment from "./Comment";

export default function CommentList(props) {
  const { comments, projectId } = props;

  return (
    <>
      {!comments.length ? (
        <span>No comments found!</span>
      ) : (
        <ul className="pb-4">
          {comments.map((comment) => (
            <Comment
              comment={comment}
              projectId={projectId}
              key={comment._id}
            />
          ))}
        </ul>
      )}
    </>
  );
}
