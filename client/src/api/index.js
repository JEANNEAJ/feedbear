import axios from 'axios';

const url = 'http://localhost:5000/forms';

export const fetchForms = () => axios.get(url);

export const fetchFormByID = ID => axios.get(`${url}/${ID}`);

export const createForm = newForm => axios.post(url, newForm);
