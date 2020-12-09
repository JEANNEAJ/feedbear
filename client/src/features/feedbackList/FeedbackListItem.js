import React from "react";
import { Link } from "react-router-dom";

export default function FeedbackListItem(props) {
  const {
    name,
    email,
    projectTitle,
    projectLink,
    liveLink,
    message,
    createdAt,
    _id,
  } = props.request;

  return (
    <li className="border-2 rounded-lg mt-3 px-3 py-2 hover:bg-gray-100">
      <div className="text-lg">
        <h3>
          <Link to={`/feedback/${_id}`}>{projectTitle}</Link>
        </h3>
      </div>
      <p>
        by {name} at {createdAt}
      </p>
      <a href={projectLink}>Project Link</a>&nbsp;
      <a href={liveLink}>Live Link</a>
      <p>{message}</p>
    </li>
  );
}
