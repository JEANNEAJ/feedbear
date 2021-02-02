import React from "react";
import { Link } from "react-router-dom";
// AT: Imported Font Awesome & 2 icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
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
   
    <li className="bg-white rounded-lg shadow-sm mt-3 px-3 py-2 hover:bg-gray-300 w-full">
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

          {_id !== '5ff63422551e1e10ac0a44a1' && //omit links from pinned project
          // AT:  Added FontAwesome icons here
          // AT: Not sure if we want to style these links as buttons on the List view so just changed the color of the text
          <div className="flex space-x-2">
            <a href={liveLink} target="_blank" rel="noopener noreferrer" className="hover:underline"><FontAwesomeIcon icon = {faEye} /> View App</a>
            <a href={projectLink} target="_blank" rel="noopener noreferrer" className="hover:underline"><FontAwesomeIcon icon= {faCode} /> View Repository</a>
          </div>}

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
