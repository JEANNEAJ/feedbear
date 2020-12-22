import { createSlice } from "@reduxjs/toolkit";

export const feedbackListSlice = createSlice({
  name: "feedbackList",
  initialState: {
    requests: [],
  },
  reducers: {
    setRequests(state, action) {
      state.requests = action.payload;
    }
  },
});

export const selectRequests = (state) => state.feedbackList.requests;

const { actions, reducer } = feedbackListSlice;
export const { setRequests } = actions;

export default reducer;
