import axios from "axios";

// const url = `${process.env.REACT_APP_API_URL}/forms`; // commented out after removing cors on backend
const url = "/projects";

/**
 * Fetch projects from database
 * @param {Number} numResults The number of projects to fetch
 * @param {String} sortBy What to sort by (createdAt by default)
 * @param {Number} sortDirection -1 for decending, 1 for ascending
 * @param {String} last the ID of the last requested item
 */
export const fetchProjects = (numResults, sortBy, sortDirection, last) =>
  axios.get(url, {
    params: {
      numResults,
      sortBy,
      sortDirection,
      last,
    },
  });

export const fetchProjectByID = (type, ID) =>
  axios.get(`${url}/${ID}`, {
    params: { type },
  });

export const createProject = (newProject) =>
  axios.post(url, newProject, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProject = (id, updatedProject) =>
  axios.patch(`${url}/${id}`, updatedProject, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProject = (id) => axios.delete(`${url}/${id}`);
