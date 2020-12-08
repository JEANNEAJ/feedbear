import { createSlice } from "@reduxjs/toolkit";

export const deleteItem = (id) => async (dispatch) => {
  try {
    await api.deleteFeedbackRequest(id);
    console.log("delete success");
  } catch (err) {
    console.log("delete failed");
    console.log(err);
  }
}


export const feedbackRequestSlice = createSlice({
  name: "feedbackRequest",
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
      state.feedbackRequests = state.feedbackRequests.filter(
        (request) => request._id !== action.payload
      );
    },
    updateRequest: (state, action) => {
      state.feedbackRequests = state.feedbackRequests.map((request) => {
        if (request._id !== action.payload.id) {
          return request;
        }
        return { ...request, ...action.payload };
      });
    },
  },
});

export default feedbackRequestSlice.reducer;
