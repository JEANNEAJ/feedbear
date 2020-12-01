import axios from 'axios';

const url = `${process.env.REACT_APP_API_URL}/forms`;

export const fetchForms = () => axios.get(url);

export const fetchFormByID = ID => axios.get(`${url}/${ID}`);

export const createForm = newForm => axios.post(url, newForm);
