import axios from "axios";

const url = "/users";

export const getUserInfo = (userId) => axios.get(`${url}/${userId}`);