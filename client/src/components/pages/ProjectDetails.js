import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getComments, selectComments } from "../../slices/commentSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import bear from "../../assets/bear.png";

import CommentList from "../comments/CommentList";
import { useParams } from "react-router-dom";
import CommentForm from "../forms/CommentForm";
import TimeDifference from "../util/TimeDifference";
import ProjectOptions from "../projects/ProjectOptions";

import * as projectApi from "../../api/projects";

export default function ProjectDetails(props) {
  const loggedInUserId = useSelector((state) => state.user.data._id);
  const [project, setProject] = useState([]);
  const comments = useSelector(selectComments);
  const { projectId } = useParams();

  const dispatch = useDispatch();

  const {
    userId: userData,
    name,
    message,
    projectTitle,
    projectLink,
    liveLink,
    createdAt,
    file,
  } = project;

  useEffect(() => {
    const populateProject = async () => {
      try {
        const { data } = await projectApi.fetchProjectByID("_id", projectId);

        setProject(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    populateProject();
    dispatch(getComments(projectId));
  }, [projectId, dispatch]);

  if (project)
    return (
      <section>
        <div className="bg-white rounded-lg shadow-md p-5 space-y-2">
          {/* header, row 1: title + edit/delete buttons */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{projectTitle}</h2>
            {loggedInUserId === userData?._id && (
              <ProjectOptions
                userId={userData?._id}
                projectId={projectId}
                projectTitle={projectTitle}
              />
            )}
          </div>

          {/* header, row 2: posted by {user} at {time difference} */}
          <div className="flex items-center">
            <img
              className="object-cover w-5 h-5 mr-1 rounded-full inline-block"
              src={userData?.avatar ? userData.avatar : bear}
              alt={`${name}'s avatar`}
            />
            <p className="text-sm">
              <Link to={{ pathname: `/user/${userData?._id}`, name }}>
                {name}
              </Link>{" "}
              <TimeDifference dateString={createdAt} /> ago
            </p>
          </div>

          {/* header, row 3: demo/code link buttons */}
          {projectId !== "5ff63422551e1e10ac0a44a1" && ( //omit links from pinned project
            <div className="flex items-end space-x-2 mt-auto">
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
            </div>
          )}

          {/* body: project image */}
          {file && (
            <img
              className="mx-auto max-w-full my-3"
              src={file}
              alt={`Preview for ${name}'s project, ${projectTitle}`}
            />
          )}

          {/* body: project message */}
          <p className="mb-10">{message}</p>
        </div>

        {/* comment section */}
        <div className="mt-10">
          <h3 className="mb-5 text-xl font-bold">Feedback</h3>
          <CommentList comments={comments} projectId={projectId} />
          <CommentForm projectId={projectId} />
        </div>
      </section>
    );
  else return <p>"Loading..."</p>;
}
