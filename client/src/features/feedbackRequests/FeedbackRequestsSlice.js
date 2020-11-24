import { createSlice } from '@reduxjs/toolkit';

import * as api from '../../api';

export const feedbackRequestSlice = createSlice({
	name: 'feedbackRequest',
	initialState: {
		feedbackRequests: [],
	},
	reducers: {
    fetchRequests: (state, action) => {
      state.feedbackRequests = action.payload;
    },
    addRequest: (state, action) => {
      state.feedbackRequests = [...state.feedbackRequests, action.payload];
    },
    removeRequest: (state, action) => {
      state.feedbackRequests = state.feedbackRequests.filter(request => request._id !== action.payload)
    },
    updateRequest: (state, action) => {
      state.feedbackRequests = state.feedbackRequests.map(request => {
        if (request._id !== action.payload.id) {
          return request;
        }
        return { ...request, ...action.payload}
      })
    }
  }
})

// export const { updateName, updateEmail, updateMessage } = formSlice.actions;

// export const submit = form => async dispatch => {
// 	console.log('form:', form);
// 	try {
// 		const { data } = await api.createForm(form);
// 		console.log('submit success');
// 		console.log(data);
// 		// dispatch({ name, email, message });

// 	} catch (err) {
// 		console.log('submit failed');
// 		console.log(err);
// 	}
// };


// export const selectUser = state => state.form.user;

export default feedbackRequestSlice.reducer;