import React from "react";
import { Link } from "react-router-dom";

import TimeDifference from "../util/TimeDifference";
import bear from "../../assets/bear.png";

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
          {/* row flex for avatar + project metadata/links */}
          <div className="flex items-center">
            {/* user avatar */}
            <img
              className="object-cover h-16 w-16 rounded-full my-auto"
              src={userId?.avatar ? userId.avatar : bear}
              alt={`${name}'s avatar`}
            />

            {/* col flex for project metadata/links */}
            <div className="flex flex-col ml-2">
              {/* project title */}
              <h3 className="text-lg">
                <Link to={`/project/${_id}`}>{projectTitle}</Link>
              </h3>

              {/* project info + links */}
              <p>
                submitted by{" "}
                <Link to={{ pathname: `/user/${userId}`, name }}>{name}</Link>{" "}
                <TimeDifference dateString={createdAt} /> ago
              </p>

              {_id !== "5ff63422551e1e10ac0a44a1" && ( //omit links from pinned project
                <div className="flex space-x-2">
                  <a href={liveLink} target="_blank" rel="noopener noreferrer">
                    View App
                  </a>
                  <a
                    href={projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Repository
                  </a>
                </div>
              )}
            </div>
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
