import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
  },
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    }
  },
});

export const selectComments = (state) => state.comments;

const { actions, reducer } = commentSlice;
export const { setComments } = actions;
export default reducer;