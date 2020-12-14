import axios from "axios";

const url = '/comments';

export const fetchComments = (feedbackID) => axios.get(`${url}/${feedbackID}`);

export const createComment = (feedbackID, newComment) => axios.post(`${url}/${feedbackID}`, newComment);

export const deleteComment = (feedbackID, commentId) => axios.delete(`${url}/${feedbackID}/${commentId}`);

export const updateComment = (feedbackID, commentId, newComment) => axios.patch(`${url}/${feedbackID}/${commentId}`, newComment);