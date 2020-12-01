import axios from 'axios';

const url = 'http://localhost:5000/forms';

export const fetchForms = () => axios.get(url);
export const fetchFormByID = (type, ID) => axios.get(`${url}/${ID}`, {
	params: {type}
});
// export const fetchFormsByUserId = userId => axios.get(`${url}/${userId}`);

export const createForm = newForm => axios.post(url, newForm);

// TODO: do we need a separate file for non-form endpoints?
export const login = credentials => axios.post('http://localhost:5000/login', credentials);