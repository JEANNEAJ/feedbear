import axios from "axios";

// const url = `${process.env.REACT_APP_API_URL}`; // commented out after removing cors on backend
const url = '';

export const login = (credentials) => axios.post(`${url}/login`, credentials);

export const signup = (credentials) => axios.post(`${url}/signup`, credentials);

export const getUserSession = () => axios.get(`${url}/session`)