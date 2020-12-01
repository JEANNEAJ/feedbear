import { createSlice } from '@reduxjs/toolkit';

import * as api from '../../api';

export const formSlice = createSlice({
	name: 'form',
	initialState: {
		user: 'test'
	},
	reducers: {}
})

export const { updateName, updateEmail, updateMessage } = formSlice.actions;

export const submit = form => async dispatch => {
	console.log('form:', form);
	try {
		const { data } = await api.createForm(form);
		console.log('submit success');
		console.log(data);
		// dispatch({ name, email, message });

	} catch (err) {
		console.log('submit failed');
		console.log(err);
	}
};


// export const selectUser = state => state.form.user;

export default formSlice.reducer;