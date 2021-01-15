import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import {
  getComments,
  setComments,
  selectComments,
} from "../../slices/commentSlice";

import CommentList from "../comments/CommentList";
import { useParams } from "react-router-dom";
import CommentForm from "../forms/CommentForm";
import TimeDifference from "../util/TimeDifference";
import ProjectOptions from "../projects/ProjectOptions";

import * as projectApi from "../../api/projects";
// import * as commentApi from "../../api/comments";

export default function ProjectDetails(props) {
  const loggedInUserId = useSelector((state) => state.user.data._id);
  const [project, setProject] = useState([]);
  const comments = useSelector(selectComments);
  const { projectId } = useParams();

  const dispatch = useDispatch();

  const {
    userId,
    name,
    message,
    projectTitle,
    projectLink,
    liveLink,
    createdAt,
    file,
  } = project;

  const populateProject = async () => {
    try {
      const { data } = await projectApi.fetchProjectByID("_id", projectId);

      setProject(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    populateProject();
    dispatch(getComments(projectId));
  }, [projectId]);

  return (
    <div className="container mx-auto">
      {!project ? (
        "Loading..."
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="text-lg flex justify-between">
              <h2 className="text-xl font-bold">{projectTitle}</h2>
              {loggedInUserId === userId && (
                <ProjectOptions
                  userId={userId}
                  projectId={projectId}
                  projectTitle={projectTitle}
                />
              )}
            </div>
            <p>
              by <Link to={`/user/${userId}`}>{name}</Link>
            </p>
            <p>
              submitted <TimeDifference dateString={createdAt} /> ago
            </p>
            <div className="flex space-x-4">
              <a href={liveLink}>View App</a>
              <a href={projectLink}>View Repository</a>
            </div>
            <img
              className="mx-auto max-w-full my-3"
              src={file ? file : "https://placekitten.com/400/300"}
              alt="Placeholder"
            />
              <p className="mb-10"><ReactMarkdown>{message}</ReactMarkdown></p>
            <p className="text-sm">ID: {projectId}</p>
          </div>
          <div className="mt-10">
            <h3 className="mb-5 text-xl font-bold">Feedback</h3>
            <CommentList comments={comments} projectId={projectId} />
            <CommentForm projectId={projectId} />
          </div>
        </>
      )}
    </div>
  );
}
