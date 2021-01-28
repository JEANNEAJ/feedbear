import axios from "axios";

const url = "";

export const login = (credentials) => axios.post(`${url}/login`, credentials);

export const signup = async (newUser) => {
  return await axios.post(`/signup`, newUser, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getUserSession = () => axios.get(`${url}/session`);

export const logout = () => axios.delete(`${url}/session`);
