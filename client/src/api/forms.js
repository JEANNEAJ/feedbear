import axios from "axios";

// const url = `${process.env.REACT_APP_API_URL}/forms`; // commented out after removing cors on backend
const url = "/forms";

export const fetchForms = () => axios.get(url);

export const fetchFormByID = (type, ID) =>
  axios.get(`${url}/${ID}`, {
    params: { type },
  });
// export const fetchFormsByUserId = userId => axios.get(`${url}/${userId}`);

export const createForm = (newForm) =>
  axios.post(url, newForm, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateFeedbackDetails = (id, updatedDetails) =>
  axios.patch(`${url}/${id}`, updatedDetails, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteFeedbackRequest = (id) => axios.delete(`${url}/${id}`);
