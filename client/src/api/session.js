import axios from "axios";

const url = `${process.env.REACT_APP_API_URL}`;

export const login = (credentials) => axios.post(`${url}/login`, credentials);

export const signup = (credentials) => axios.post(`${url}/signup`, credentials);
