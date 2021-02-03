import React from "react";
import { Link } from "react-router-dom";
// AT: Imported Font Awesome & 2 icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCode, faComments } from "@fortawesome/free-solid-svg-icons";
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
    file,
  } = props.project;

  return (
    <li className="bg-white rounded-lg shadow-sm mt-3 px-3 py-2 hover:bg-gray-300 w-full">
      {/* project header */}
      <div className="flex justify-between w-full flex-shrink-0">
        {/* posted by {user} at {time difference} */}
        <div className="flex items-center">
          <img
            className="object-cover w-5 h-5 mr-1 rounded-full inline-block"
            src={userId?.avatar ? userId.avatar : bear}
            alt={`${name}'s avatar`}
          />
          <p className="text-sm">
            <Link to={{ pathname: `/user/${userId?._id}`, name }}>{name}</Link>{" "}
            <TimeDifference dateString={createdAt} /> ago
          </p>
        </div>

        {/* demo and repo links */}
        <div className="flex items-end space-x-2 mt-auto">
          {_id !== "5ff63422551e1e10ac0a44a1" && ( //omit links from pinned project
            <>
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pill bg-blueBtn"
              >
                <FontAwesomeIcon icon={faEye} />
                <span>Demo</span>
              </a>
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pill bg-greenBtn"
              >
                <FontAwesomeIcon icon={faCode} />
                <span>Code</span>
              </a>
            </>
          )}
        </div>
      </div>

      {/* project body */}
      <div className="flex justify-between">
        {/* LEFT SIDE: title, message, and comment count */}
        <div className="flex flex-col">
          {/* project title */}
          <h3 className="text-xl mt-3">
            <Link to={`/project/${_id}`}>{projectTitle}</Link>
          </h3>

          {/* project message */}
          <p>{message}</p>

          <div className="flex items-end text-sm space-x-2 mt-auto pt-5">
            {/* Comment count */}
            <Link
              to={`/project/${_id}`}
              title="Number of comments"
              className="space-x-1"
            >
              <FontAwesomeIcon icon={faComments} />
              <span>
                {commentsCount || 0} comment{commentsCount !== 1 && "s"}
              </span>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: image thumbnail, edit/delete buttons */}
        <div className="pl-5 flex-shrink-0 flex flex-col justify-between w-40 items-end">
          {file && (
            <img
              className="object-cover rounded-lg mt-10"
              src={file}
              alt={`Preview for ${name}'s project, "`}
            />
          )}

          {/* edit and delete button (if applicable) */}
          <div className="mt-auto pt-2">{props.children}</div>
        </div>
      </div>
    </li>
  );
}
