import axios from "axios";

const url = "/comments";

export const fetchComments = (projectId) => axios.get(`${url}/${projectId}`);

export const createComment = (projectId, newComment) =>
  axios.post(`${url}/${projectId}`, newComment);

export const deleteComment = (projectId, commentId) =>
  axios.delete(`${url}/${projectId}/${commentId}`);

export const updateComment = (projectId, commentId, newComment) =>
  axios.patch(`${url}/${projectId}/${commentId}`, newComment);
