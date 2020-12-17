import React from "react";
import { Link } from "react-router-dom";

import TimeDifference from "../../components/timeDifference/TimeDifference";

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
    <li className="bg-white rounded-lg shadow-sm mt-3 px-3 py-2 hover:bg-gray-100">
      {/* feedback request title */}
      <div className="text-lg flex justify-between">
        <h3>
          <Link to={`/feedback/${_id}`}>{projectTitle}</Link>
        </h3>

        {/* edit and delete button from UserPage */}
        {props.children}
      </div>

      {/* feedback request info + links */}
      <p>
        submitted by {name} <TimeDifference dateString={createdAt} /> ago
      </p>
      <div className="flex space-x-2">
        <a href={projectLink}>Project Link</a>
        <a href={liveLink}>Live Link</a>
      </div>

      {/* feedback request message */}
      <p className="mt-5">{message}</p>
    </li>
  );
}
