import axios from "axios";

const url = "/users";

export const getUserName = (userId) => axios.get(`${url}/${userId}`);