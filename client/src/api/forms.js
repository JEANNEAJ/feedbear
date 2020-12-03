import axios from 'axios';

const url = `${process.env.REACT_APP_API_URL}/forms`;

export const fetchForms = () => axios.get(url);
export const fetchFormByID = (type, ID) => axios.get(`${url}/${ID}`, {
	params: {type}
});
// export const fetchFormsByUserId = userId => axios.get(`${url}/${userId}`);

export const createForm = newForm => axios.post(url, newForm);
