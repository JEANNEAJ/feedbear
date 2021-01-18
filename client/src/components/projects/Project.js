import React from "react";
import { Link } from "react-router-dom";

import TimeDifference from "../util/TimeDifference";

export default function Project(props) {
  const {
    name,
    userId,
    projectTitle,
    projectLink,
    liveLink,
    message,
    createdAt,
    _id,
    commentsCount,
  } = props.project;

  return (
    <li className="bg-white rounded-lg shadow-sm mt-3 px-3 py-2 hover:bg-gray-100">
      <div className="flex justify-between">
        <div>
          {/* project title */}
          <div className="text-lg flex justify-between">
            <h3>
              <Link to={`/project/${_id}`}>{projectTitle}</Link>
            </h3>
          </div>

          {/* project info + links */}
          <p>
            submitted by{" "}
            <Link to={{ pathname: `/user/${userId}`, name }}>{name}</Link>{" "}
            <TimeDifference dateString={createdAt} /> ago
          </p>
          <div className="flex space-x-2">
            <a href={liveLink} target="_blank" rel="noopener noreferrer">View App</a>
            <a href={projectLink} target="_blank" rel="noopener noreferrer">View Repository</a>
          </div>

          {/* project message */}
          <p className="mt-5">{message}</p>
        </div>
        <div className="flex flex-col justify-between items-end w-24">
          {/* Comment count */}
          <Link to={`/project/${_id}`} title="Number of comments">
          💬{commentsCount || 0}
          </Link>

          {/* edit and delete button from UserPage */}
          {props.children}
        </div>
      </div>
    </li>
  );
}
