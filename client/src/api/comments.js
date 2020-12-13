import axios from "axios";

const url = '/comments';

export const fetchComments = (feedbackID) => axios.get(`${url}/${feedbackID}`);

export const createComment = (feedbackID, newComment) => axios.post(`${url}/${feedbackID}`, newComment);