import axios from 'axios';

const url = 'http://localhost:5000/forms';

export const fetchForms = () => axios.get(url);

export const fetchFormByID = ID => axios.get(`${url}/${ID}`);

export const createForm = newForm => axios.post(url, newForm);

// TODO: do we need a separate file for non-form endpoints?
export const login = credentials => axios.post('http://localhost:5000/login', credentials);

export const signup = credentials => axios.post('http://localhost:5000/signup', credentials);